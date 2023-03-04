window.onload = () => {
    LikeService.getInstance().clearEmoLikeList();
    LikeService.getInstance().loadLikeEmos();
}
const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
}

class LikeApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new LikeApi();
        }
        return this.#instance;
    }

    getUserLikeEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/mypage/like",
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

}

class LikeService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new LikeService();
        }
        return this.#instance;
    }

    clearEmoLikeList() {
        const contentFlex = document.querySelector(".main_mypage");
        contentFlex.innerHTML = "";
    }

    loadLikeEmos() {
        const responseData = LikeApi.getInstance().getUserLikeEmo();
        const contentFlex = document.querySelector(".main_mypage");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _Buttons = document.querySelectorAll(".buttons");
        const ButtonsLength = _Buttons == null ? 0 : _Buttons.length;
        
        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
            <ul>
            <li>
            <input type="hidden" class="emo-id" value="${data.emoId}">
            <input type="hidden" class="like-count" value="${data.likeCount}">
            <span class="number"></span>
            <div class="hot-info-title">
            
          
            <h2 class="emo-name">${data.emoName}</h2>
            
            
            <p class="author">${data.company}</p>
            <div class="buttons">
                <span class="like-count">${data.likeCount != null ? data.likeCount : 0}</span>
            
            </div>
            </div>
            <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.png"}" class="emo-img">
            
            </li>
            </ul>
            `;

            const Buttons = document.querySelectorAll(".buttons");
                          
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
                // ComponentEvent.getInstance().addClickEventLikeButtons();
            
        })
    }
    
}

