window.onload = () => {
    // console.log(HotSearchApi.getInstance().getTotalCount());
    // console.log(HotSearchApi.getInstance().searchEmo());

    HotSearchService.getInstance().clearEmoList();
    HotSearchService.getInstance().loadSearchEmos();

    HotSearchService.getInstance().setMaxPage();

    ComponentEvent.getInstance().addScrollEventPaging();
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

        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
                <li>
                    <a class="hot-link" href="/main/detail">
                    <span class="emo-id"></span>
                    <div class="hot-info-title">
                        <h2 class="emo-name">${data.emoName}</h2>
                    
                        <p class="author">${data.company}</p>
                        <button class="like-button">
                        <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                    <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.png"}" class="emo-img">
                    </a>
                </li>
            `;
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

        // console.log("html client: " + html.clientHeight);
        // console.log("body offset: " + body.offsetHeight);
        // console.log("html scrollTop: " + html.scrollTop);

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;

            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                HotSearchService.getInstance().loadSearchEmos();
            }
        }
    }
}