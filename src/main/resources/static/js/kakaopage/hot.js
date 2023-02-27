window.onload = () => {
    ToggleService.getInstance().loadlogin();
    EmoListService.getInstance().onLoadSearch();
    EmoListService.getInstance().setMaxPage();
    EmoListService.getInstance().loadSearchEmos();
    
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
            url: "http://localhost:8000/api/emos/totalcount",
            data: emoSearchObj,
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
            url: "http://localhost:8000/api/emos",
            data: emoSearchObj,
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
            url: `http://localhost:8000/api/emo/${emoId}/like`,
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

    setDisLike(emoId) {
        let likeCount = -1;

        $.ajax({
            async: false,
             type: "delete",
            url: `http://localhost:8000/api/emo/${emoId}/like`,
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
        if (this.#instance == null) {
            this.#instance = new EmoListService();
        }
        return this.#instance;
    }


    onLoadSearch() {
        const URLSearch = new URLSearchParams(location.search);
        if (URLSearch.has("searchValue")) {
            const searchValue = URLSearch.get("searchValue");
            if (searchValue == "") {
                return;
            }
            const searchInput = document.querySelector(".search-bar-input");
            searchInput.value = searchValue;
            const searchButton = document.querySelector(".search-bar-button");
            searchButton.click();
        }
    }

    setMaxPage() {
        const totalCount = EmoListApi.getInstance().getTotalCount();
        maxPage = totalCount % 10 == 0
            ? totalCount / 10
            : Math.floor(totalCount / 10) + 1;

    }

    loadSearchEmos() {
        const responseData = EmoListApi.getInstance().getTotalCount();
        const content = document.querySelector(".content");
        // const principal = PrincipalApi.getInstance().getPrincipal();

        const likeButtons = document.querySelectorAll(".like-button");

        console.log(responseData)
        responseData.forEach((data, index) => {
            content.innerHTML += `
            <div>
            <ul class="hot-info">
              <li>
                <a class="hot-link" href="/main/detail">
                  <span class="emo-id">1</span>
                  <div class="hot-info-title">
                    <h2 class="emo-name">이모티콘 이름1</h2>
                  
                    <p class="author">작가 이름1</p>
                    <button class="like-buttons">
                      <i class="fa-regular fa-heart"></i>
                    </button>
                  </div>
                  <img src="/static/images/noimg.jpg" alt="" class="emo-img">
                </a>
              </li>
            </ul>
        </div>
            `;
            const likeButtons = document.querySelectorAll(".like-buttons");
            if (principal == null) {

                likeButtons[likeButtonsLength + index].innerHTML += `
                    <button type="button" class="like-button" disabled>추천</button>
                `;
            } else {

                if (data.likeId != 0) {
                    likeButtons[likeButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons dislike-button">추천취소</button>
                    `;
                } else {
                    likeButtons[likeButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons like-button">추천</button>
                    `;
                }

                ComponentEvent.getInstance().addClickEventLikeButtons();
            }
        })
    }
}