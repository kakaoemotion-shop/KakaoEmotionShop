window.onload = () => {
    // console.log(HotSearchApi.getInstance().getTotalCount());
    // console.log(HotSearchApi.getInstance().searchEmo());

    HotSearchService.getInstance().clearEmoList();
    HotSearchService.getInstance().loadSearchEmos();
}

const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
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
}

class HotSearchService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HotSearchService();
        }
        return this.#instance;
    }

    // setMaxPage() {
    //     const totalCount = SearchApi.getInstance().getTotalCount();
    //     maxPage = totalCount % 10 == 0 
    //         ? totalCount / 10 
    //         : Math.floor(totalCount / 10) + 1;

    // }

    clearEmoList() {
        const contentFlex = document.querySelector(".hot-info");
        contentFlex.innerHTML = "";
    }

    loadSearchEmos() {
        const responseData = HotSearchApi.getInstance().searchEmo();
        const contentFlex = document.querySelector(".hot-info");

        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
                <li>
                    <a class="hot-link" href="/main/detail">
                    <span class="emo-id">${data.emoCode}</span>
                    <div class="hot-info-title">
                        <h2 class="emo-name">${data.emoName}</h2>
                    
                        <p class="author">${data.company}</p>
                        <button class="like-button">
                        <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                    <img src="/static/images/noimg.jpg" alt="" class="emo-img">
                    <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.png"}" class="emo-img">
                    </a>
                </li>
            `;
        })
    }
}