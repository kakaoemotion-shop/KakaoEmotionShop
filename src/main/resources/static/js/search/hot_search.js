window.onload = () => {
    // console.log(HotSearchApi.getInstance().getTotalCount());
    // console.log(HotSearchApi.getInstance().searchEmo());

    HotSearchService.getInstance().clearEmoList();
    HotSearchService.getInstance().loadSearchEmos();

    HotSearchService.getInstance().setMaxPage();

    ComponentEvent.getInstance().addScrollEventPaging();
    ComponentEvent.getInstance().addClickEventLikeButtons();
}

let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
}

const imgObj = {
    img01: null,
    img02: null,
    img03: null,
    img04: null
}

class HotSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HotSearchApi();
        }
        return this.#instance;
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

class HotSearchService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HotSearchService();
        }
        return this.#instance;
    }

     setMaxPage() {
         const totalCount = HotSearchApi.getInstance().getTotalCount();
         maxPage = totalCount % 10 == 0
             ? totalCount / 10
             : Math.floor(totalCount / 10) + 1;

     }

    clearEmoList() {
        const contentFlex = document.querySelector(".hot-info");
        contentFlex.innerHTML = "";
    }

    loadSearchEmos() {
        const responseData = HotSearchApi.getInstance().searchEmo();
        const contentFlex = document.querySelector(".hot-info");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _Buttons = document.querySelectorAll(".buttons");
        const ButtonsLength = _Buttons == null ? 0 : _Buttons.length;
        
        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
            <li>
            <input type="hidden" class="emo-id" value="${data.emoId}">
            <input type="hidden" class="like-count" value="${data.likeCount}">
            <span class="number"></span>
            <div class="hot-info-title">
            
          
            <h2 class="emo-name">${data.emoName}</h2>
            
            
            <p class="author">${data.company}</p>
            <p class="buttons">
            
            </p>
            </div>
            <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.png"}" class="emo-img">
            
            </li>
            `;

            const Buttons = document.querySelectorAll(".buttons");
            
            if(principal == null) {
                
                Buttons[ButtonsLength + index].innerHTML += `
                <button type="button" class="no-login-like like-button">
                <i class="fa-regular fa-heart"></i>
                </button>
                `;

                ComponentEvent.getInstance().addClickEventLikeButtonsNoLogin();

            }else {              
                if(data.likeId != 0){
                    console.log("ButtonLength : " + ButtonsLength);
                    Buttons[ButtonsLength + index].innerHTML += `
                    <button type="button" class="like-buttons dislike-button">
                    <i class="fa-solid fa-heart"></i>
                    </button>
                    `;
                }else {
                    Buttons[ButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons like-button">
                        <i class="fa-regular fa-heart"></i>
                        </button>
                    `;
                }
                ComponentEvent.getInstance().addClickEventLikeButtons();
            }
        })
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addScrollEventPaging() {
        const html = document.querySelector("html");
        const body = document.querySelector("body");

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;

            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                HotSearchService.getInstance().loadSearchEmos();
            }
        }
    }

    addClickEventLikeButtons() {
        const likeButtons = document.querySelectorAll(".like-buttons");
        const emoIds = document.querySelectorAll(".emo-id");

        likeButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("like-button")){
                    const likeCount = HotSearchApi.getInstance().setLike(emoIds[index].value);
                    if(likeCount != -1){
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                    }
                    
                }else {
                    const likeCount = HotSearchApi.getInstance().setDisLike(emoIds[index].value);
                    if(likeCount != -1){
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                    }
                }
            }
        });
    }

    // addClickEventLikeButtonsNoLogin() {
    //     const likeButtonError = document.querySelectorAll(".no-login-like");
    //     const emoIds = document.querySelectorAll(".emo-id");

    //     likeButtonError.forEach((button, index) => {
    //         button.onclick = () => {
    //             const Flag = emoIds[index].value;
    //             if(Flag != 1){
    //                 alert("로그인 후 사용")
    //                 location.replace("/account/login");
    //             }
    //         }

    //     });
    // }
      
}