window.onload = () => {
    EmoNewPageService.getInstance().onLoadSearch()
    EmoNewPageMaxPage.getInstance().setMaxPage()
    EmoNewPageMaxPage.getInstance().addScrollEventPaging()
}



let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 6
}

const emoObj = {
    emoCode: "",
    emoName: "",
    company: ""
}

const imgObj = {
    imageId: null,
    emoCode: null,
    saveName: null,
    originName: null
}

class EmoNewPageApi{
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoNewPageApi()
        }
        return this.#instance
    }

    searchEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/hot/search",
            data: searchObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }

    

    getTotalCount() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/hot/search/totalcount",
            data: searchObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }
    setLike(emoId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/emo/${emoId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }

    setDisLike(emoId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "delete",
            url: `http://127.0.0.1:8000/api/emo/${emoId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }
}

class EmoNewPageService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoNewPageService();
        }
        return this.#instance
    }

    clearEmoList() {
        const contentFlex = document.querySelector(".new-info");
        contentFlex.innerHTML = "";
    }

    onLoadSearch(){
        const responseData = EmoNewPageApi.getInstance().searchEmo()
        const emoImg = document.querySelectorAll(".new-info-img")
        imgObj.saveName = responseData.emoImage.saveName
        imgObj.originName = responseData.emoImage.originName
        const emoListBody = document.querySelector(".new-info")
        console.log(responseData)
        emoListBody.innerHTML =''
        responseData.forEach((data, index) => {
            
                
            responseData.emoImage.forEach((imgObj, index) => {
                emoImg[index].src = "http://127.0.0.1:8000/image/emo/" + imgObj.saveName;
            })
            emoListBody.innerHTML += `
                <li>
                    <a class="new-link" href="/main/detail">
                        <div class="new-info-title">
                            <h2 class="emo-name">${data.emoName}</h2>
                            <p class="author">${data.company}</p>
                            <button class="like-button">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                        <img src="${emoImg}" class="emo-img">
                        <img src="${emoImg}" class="emo-img">
                        <img src="${emoImg}" class="emo-img">
                        <img src="${emoImg}" class="emo-img">
                    </a>
                </li>
            `
            
        })    
    }

    


}

class EmoNewPageMaxPage{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new EmoNewPageMaxPage();
        }
        return this.#instance;
    }
    setMaxPage() {
        const totalCount = EmoNewPageApi.getInstance().getTotalCount();
        maxPage = totalCount % 6 == 0
            ? totalCount / 6
            : Math.floor(totalCount / 6) + 1;

    }
    addScrollEventPaging() {
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        console.log(body.offsetHeight)
        console.log(html.clientHeight)
        console.log(html.scrollTop)

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;
            
            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                EmoNewPageService.getInstance().onLoadSearch();
            }
        }
    }
}