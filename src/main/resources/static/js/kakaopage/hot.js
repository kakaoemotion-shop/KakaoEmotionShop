window.onload = () => {

EmoListService.getInstance().clearMenu();

}

let maxPage = 0;

const emoSearchObj = {
    page: 1,
    searchValue: null,
    categories: new Array(),
    count: 20
}
class EmoListApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoListApi();
        }
        return this.#instance;
    }

    getTotalCount() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/totalcount",
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

    searchEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search",
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

    setLike(bookId) {
        let likeCount = -1;

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/book/${bookId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }

    setDisLike(bookId) {
        let likeCount = -1;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/book/${bookId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }
}




class EmoListService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new EmoListService();
        }
        return this.#instance;
    }
    clearMenu() {
        const menuAside = document.querySelector(".menu-aside");
        const searchPage = document.querySelector(".search-page");
        menuAside.classList.toggle('active')
        searchPage.innerHTML = "";
    }

    onLoadSearch() {
        const URLSearch = new URLSearchParams(location.search);
        if(URLSearch.has("searchValue")){
            const searchValue = URLSearch.get("searchValue");
            if(searchValue == "") {
                return;
            }
            const searchInput = document.querySelector(".search-bar-input");
            searchInput.value = searchValue;
            const searchButton = document.querySelector(".search-bar-button");
            searchButton.click();
        }
    }
    setMaxPage() {
        const totalCount = SearchApi.getInstance().getTotalCount();
        maxPage = totalCount % 10 == 0 
            ? totalCount / 10 
            : Math.floor(totalCount / 10) + 1;

    }

    
  
    loadSearchEmos() {
        const responseData = SearchApi.getInstance().searchEmo();
        const contentFlex = document.querySelector(".content-flex");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _bookButtons = document.querySelectorAll(".book-buttons");
        const bookButtonsLength = _bookButtons == null ? 0 : _bookButtons.length;

        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
                <div class="info-container">
                    <div class="book-desc">
                        <div class="img-container">
                            <img src="http://localhost:8000/image/book/${data.saveName != null ? data.saveName : "no_img.png"}" class="book-img">
                        </div>
                        <div class="like-info"><i class="fa-regular fa-thumbs-up"></i> <span class="like-count">${data.likeCount != null ? data.likeCount : 0}</span></div>
                    </div>
                    
                    <div class="book-info">
                        <input type="hidden" class="book-id" value="${data.bookId}">
                        <div class="book-code">${data.bookCode}</div>
                        <h3 class="book-name">${data.bookName}</h2>
                        <div class="info-text book-author"><b>저자: </b>${data.author}</div>
                        <div class="info-text book-publisher"><b>출판사: </b>${data.publisher}</div>
                        <div class="info-text book-publicationdate"><b>출판일: </b>${data.publicationDate}</div>
                        <div class="info-text book-category"><b>카테고리: </b>${data.category}</div>
                        <div class="book-buttons">
                            
                        </div>
                    </div>
                </div>
            `;
            const bookButtons = document.querySelectorAll(".book-buttons");
            if(principal == null) {
                if(data.rentalDtlId != 0 && data.returnDate == null){
                    bookButtons[bookButtonsLength + index].innerHTML = `
                        <button type="button" class="rental-button" disabled>대여중</button>
                    `;
                }else {
                    bookButtons[bookButtonsLength + index].innerHTML = `
                        <button type="button" class="rental-button" disabled>대여가능</button>
                    `;
                }

                bookButtons[bookButtonsLength + index].innerHTML += `
                    <button type="button" class="like-button" disabled>추천</button>
                `;
            }else {
                if(data.rentalDtlId != 0 && data.returnDate == null && data.userId != principal.user.userId){
                    bookButtons[bookButtonsLength + index].innerHTML = `
                        <button type="button" class="rental-buttons rental-button" disabled>대여중</button>
                    `;
                }else if(data.rentalDtlId != 0 && data.returnDate == null && data.userId == principal.user.userId) {
                    bookButtons[bookButtonsLength + index].innerHTML = `
                        <button type="button" class="rental-buttons return-button">반납하기</button>
                    `;
                }else {
                    bookButtons[bookButtonsLength + index].innerHTML = `
                        <button type="button" class="rental-buttons rental-button">대여하기</button>
                    `;
                }
                if(data.likeId != 0){
                    bookButtons[bookButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons dislike-button">추천취소</button>
                    `;
                }else {
                    bookButtons[bookButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons like-button">추천</button>
                    `;
                }

                ComponentEvent.getInstance().addClickEventRentalButtons();
                ComponentEvent.getInstance().addClickEventLikeButtons();
            }
        })
}}