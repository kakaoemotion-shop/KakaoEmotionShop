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
        
        console.log(responseData)
        responseData.forEach((data, index) => {
            if(principal == null){
            contentFlex.innerHTML += `
                <h4 class="tit_mypage">
                    <span class="txt_tit">좋아요<span class="tit_num"></span></span>
                </h4>
                <strong class="screen_out">좋아요 본문</strong>

                <div class="area_empty">
                    <div class="inner_area">
                        <img class="img_empty" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/empty_like.png" alt="좋아하는 이모티콘 없음 이미지">
                        <strong class="tit_empty">좋아하는 이모티콘이 없습니다.</strong>
                        <p class="desc_empty">마음에 드는 이모티콘에 하트를 눌러보세요!</p>
                    </div>
                </div>
                <div>
                </div>
            `;
            }
        })
    }
}

