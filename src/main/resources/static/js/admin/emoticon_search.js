window.onload = () => {
    SearchApi.getInstance().onLoadSearch()
    SearchApi.getInstance().loadSearchNumberList()
    ComponentEvent.getInstance().addClickEventSearchButton()
    ComponentEvent.getInstance().addClickEventDeleteCheckAll()
    ComponentEvent.getInstance().addClickEventDeleteButton()

}


let emoSearchObj = {
    page : 1,
    searchValue : "",
    order : "",
    limit: "Y",
    count: 20
}

class SearchService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
    }

    getEmoticons(emoSearchObj){
        let returnData = null;

        $.ajax({
            async: false,
            type: 'get',
            url: 'http://127.0.0.1:8000/api/admin/emos',
            data: emoSearchObj,
            dataType: 'json',
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnData
    }

    getEmoticonTotalCount(emoSearchObj){
        let returnData = null

        $.ajax({
            async: false,
            type: 'get',
            url: 'http://127.0.0.1:8000/api/admin/emos/totalcount',
            data:{
                "searchValue" : emoSearchObj.searchValue
            },
            dataType: 'json',
            success: response => {
                console.log(response)
                returnData = response.data
            },
            error: error => {
                console.log(error);
            }
        })

        return returnData
    }
    deleteEmos(deleteArray){
        let returnData = false;
        $.ajax({
            contentType: "application/json",
            async: false,
            type: "delete",
            data: JSON.stringify(
                {emoId: deleteArray}
            ),
            dataType:"json",
            url: "http://127.0.0.1:8000/api/admin/emos",
            success: response => {
                console.log(response)
                returnData = true
            },
            error: error => {
                console.log(error)
            }

        })
        return returnData
    }

}

class SearchApi{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
        }
        return this.#instance;
    }

    onLoadSearch(){
        const responseData = SearchService.getInstance().getEmoticons(emoSearchObj)
        const emoListBody = document.querySelector(".search-table tbody")
        emoListBody.innerHTML =''
        responseData.forEach((data) => {
            emoListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="emo-id">${data.emoId}</td>
                    <td>${data.emoCode}</td>
                    <td>${data.emoName}</td>
                    <td>${data.company}</td>
                    <td>${data.emoDate}</td>
                    <td><a href="/templates/admin/emotion_modification.html?emoCode=${data.emoCode}"><i class="fa-solid fa-square-pen"></i></td>
                </tr>
            `
        })    
        this.loadSearchNumberList
        ComponentEvent.getInstance().addClickEventDeleteCheckbox()
    }

    loadSearchNumberList(){
        const pageController = document.querySelector(".page-controller")
        pageController.innerHTML = ""
        
        const totalCount = SearchService.getInstance().getEmoticonTotalCount(emoSearchObj)
        const maxPageNumber = totalCount % emoSearchObj.count == 0 
                            ? Math.floor(totalCount / emoSearchObj.count) 
                            : Math.floor(totalCount / emoSearchObj.count) + 1 

        pageController.innerHTML =`
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `
        
        if(emoSearchObj.page != 1){
            const preButton = pageController.querySelector(".pre-button")
            preButton.classList.remove("disabled")
            preButton.onclick = () => {
                emoSearchObj.page--
    
                this.onLoadSearch()
            }
        }

        if(emoSearchObj.page != maxPageNumber){
            const nextButton = pageController.querySelector(".next-button")
            nextButton.classList.remove("disabled")
            nextButton.onclick = () => {
                emoSearchObj.page++
    
                this.onLoadSearch()
            }
        }

        const startIndex = emoSearchObj.page % 5 == 0 
                        ? emoSearchObj.page - 4 
                        : emoSearchObj.page - (emoSearchObj.page % 5) + 1 
        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber
        const pageNumbers = document.querySelector(".page-numbers")

        for(let i = startIndex; i <= endIndex; i++){
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)"class="page-button ${i == emoSearchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `
        }

        const pageButtons = document.querySelectorAll(".page-button")
        pageButtons.forEach(button => {
            const pageNumber = button.textContent
            if(pageNumber != emoSearchObj.page){
                button.onclick = () => {
                    emoSearchObj.page = pageNumber
                    this.onLoadSearch()
                }
            }
        }) 
    }

}

class ComponentEvent {
    static #instance = null
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ComponentEvent();
        }
        return this.#instance
    }

    addClickEventSearchButton(){
        const searchInput = document.querySelector(".search-bar")
        const searchButton = document.querySelector(".search-icon-btn")

        searchButton.onclick = () => {
            emoSearchObj.searchValue = searchInput.value
            emoSearchObj.page = 1

            SearchApi.getInstance().onLoadSearch()
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13){
                searchButton.click();
            }
        }
        
    }

    addClickEventDeleteButton(){
        const deleteButton = document.querySelector(".delete-button")

        deleteButton.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")){
                const deleteArray = new Array();
    
                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")
                deleteCheckboxs.forEach((deleteCheckboxs, index) => {
                    if(deleteCheckboxs.checked){
                        const emoId = document.querySelectorAll(".emo-id")
                        deleteArray.push(emoId[index].textContent)
                    }
                })
    
                SearchService.getInstance().deleteEmos(deleteArray)
            }
        }


    }


    addClickEventDeleteCheckAll(){
        const checkAll = document.querySelector(".delete-checkall")
        checkAll.onclick = () => {
            const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")
            deleteCheckboxs.forEach(deleteCheckboxs => {
                deleteCheckboxs.checked = checkAll.checked

            })
        }
    }

    addClickEventDeleteCheckbox(){
        const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")
        
        const checkAll = document.querySelector(".delete-checkall")

        deleteCheckboxs.forEach(deleteCheckbox => {
            deleteCheckbox.onclick = () => {
                const deleteCheckedcheckboxs = document.querySelectorAll(".delete-checkbox:checked")
                if(deleteCheckedcheckboxs.length == deleteCheckboxs.length){
                    checkAll.checked = true
                }else {
                    checkAll.checked = false
                }
            }
        })
    }

    
}