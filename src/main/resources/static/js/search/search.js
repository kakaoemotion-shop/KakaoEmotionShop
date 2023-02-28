window.onload = () => {
    SearchService.getInstance().clearEmoList();
    SearchService.getInstance().loadSearchEmos();
    SearchService.getInstance().setMaxPage();
    SearchService.getInstance().onLoadSearch();
    // SearchService.getInstance().searchTotalCount();
    
    ComponentEvent.getInstance().addClickSearchButton(); 
    ComponentEvent.getInstance().addScrollEventPaging(); 
}

let maxPage = 0;

// let searchCount = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 20
}



class SearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
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
        });
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
                console.log(response);
                responseData = response.data;
            },
            error: error => {
                console.log(error);    
            }
        });
        return responseData;
    }

}



class SearchService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
    }

    onLoadSearch() {
        const URLSearch = new URLSearchParams(location.search);
        if(URLSearch.has("sarchValue")) {
            const searchValue = URLSearch.get("searchValue");
            if(searchValue == "") {
                return;
            }
        }
        const searchInput = document.querySelector(".search-bar-input");
        searchInput.value = searchObj.searchValue;

        const searchButton = document.querySelector(".search-bar-button");
        searchButton.click();
    }

    setMaxPage() {
        const totalCount = SearchApi.getInstance().getTotalCount();

        maxPage = totalCount % 10 == 0 
            ? totalCount / 10 
            : Math.floor(totalCount / 10) + 1;        
    }

    // setSearchCount() {
    //     const searchTotalCount = SearchApi.getInstance().getTotalCount();
        
    //     searchCount = searchTotalCount 
    // }

    clearEmoList() {
        const searchFlex = document.querySelector(".search-flex");
        searchFlex.innerHTML = "";
    }


    loadSearchEmos() {
        const responseData = SearchApi.getInstance().searchEmo();
        const searchFlex = document.querySelector(".search-flex");

        responseData.forEach((data) => {
            searchFlex.innerHTML += `
            <div class="emotion-serch">
                <div class="emotion-tilte">
                    <a class="search-link" href="">
                        <h3>${data.emoName}</h3>
                        <h4>${data.company}</h4>
                        <button class="like-button">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    </a>
                </div>
                <a class="emotion-img-link" href="" >
                    <div class="emotion-view-img">
                        <img src="http://localhost:8000/image/emo/${data.saveName != null ? data.saveName : 'noimg.jpg'}" alt="">
                    </div>
                </a>
            </div>
            `;
        });
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

        console.log("html client: " + html.clientHeight);
        console.log("body offset: " + body.offsetHeight);
        console.log("html scrollTop: " + html.scrollTop);

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;
        
            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                SearchService.getInstance().loadSearchEmos();
            }
        }
    }

    addClickSearchButton() {
        const searchButton = document.querySelector(".search-bar-button");
        const searchInput = document.querySelector(".search-bar-input");

        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;

            window.scrollTo(0,0);

            SearchService.getInstance().clearEmoList();
            SearchService.getInstance().setMaxPage();
            SearchService.getInstance().loadSearchEmos();
        }
        
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    // addclikLikeButtons() {
    //     const likeButtons = 
    // }

}
