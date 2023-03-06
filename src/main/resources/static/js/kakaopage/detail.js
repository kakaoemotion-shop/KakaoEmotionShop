window.onload = () => {
    DetailService.getInstance().setEmoCode()
    DetailService.getInstance().loadEmoImageOne()
    DetailService.getInstance().loadEmoAndImageData()


}

const emoObj = {
    emoCode: "",
    emoName: "",
    company: "",
    emoDate: ""
}
const emoObj2 = {
    emoCode: "",
    emoName: "",
    company: "",
    emoDate: ""
}

const imgObj = {
    imageId: null,
    emoCode: null,
    saveName: null,
    originName: null
}

const imgObjOne = {
    imageId: null,
    emoCode: null,
    saveName: null,
    originName: null
}


class DetailApi {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DetailApi()
        }
        return this.#instance
    }

    getEmoAndImageOne() {
        let responseData = null

        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/admin/emo/image/one/${emoObj2.emoCode}`,
            dataType: "json",
            success: response => {
                responseData = response.data
            },
            error: error => {
                console.log(error)
            }
        })
        return responseData

    }

    getEmoAndImage() {
        let responseData = null

        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/admin/emos/${emoObj.emoCode}`,
            dataType: "json",
            success: response => {
                responseData = response.data
            },
            error: error => {
                console.log(error)
            }
        })
        return responseData
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


class DetailService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DetailService();
        }
        return this.#instance
    }

    setEmoCode() {
        const URLSearch = new URLSearchParams(location.search)
        const URLSearch2 = new URLSearchParams(location.search)
        emoObj.emoCode = URLSearch.get("emoCode")
        emoObj2.emoCode = URLSearch.get("emoCode")
    }

    clearEmoList() {
        const contentFlex = document.querySelector(".emoticon-area");
        contentFlex.innerHTML = "";
    }


    loadEmoImageOne() {
        const responseData = DetailApi.getInstance().getEmoAndImageOne()
        const emoticonArea = document.querySelector(".emoticon-area")
        const principal = PrincipalApi.getInstance().getPrincipal();

        const Buttons = document.querySelectorAll(".right-like-box");
        const ButtonsLength = Buttons == null ? 0 : Buttons.length;


        emoticonArea.innerHTML = `
            <div class="emoticon-product">
            <input type="hidden" class="emo-id" value="${responseData.emoId}">
                <div class="emoticon-box">
                    <div class="emoticon-thumb">
                        <img class="main-emoticon"
                            src="http://127.0.0.1:8000/image/emo/${responseData.emoImage[0].saveName != null ? responseData.emoImage[0].saveName : "noimg.png"}"
                            alt="">
                    </div>
                </div>
            </div>
            <div class="txt-area">
                <div class="txt-box">
                    <h3 class="emoticon-name">${responseData.emoMst.emoName}</h3>
                    <span class="txt-author">${responseData.emoMst.company}</span>
                    <div class="price-box">
                        <span class="txt-promotion">항상 전상품 20% 할인</span>
                        <div>
                            <span class="txt-price">2,000</span>
                            <span class="txt-price-won">원</span>
                            <div class="right-like-box">
                                <i class="fa-regular fa-heart heart-detail"></i>
                            </div>
                        </div>
                    </div>
                    <button class="purchase-button">구매하기</button>
                </div>
            </div>
        `;

        if (principal == null) {

            Buttons[ButtonsLength + index].innerHTML += `
            <button type="button" class="no-login-like like-button disabled">
            <i class="fa-regular fa-heart"></i>
            </button>
            `;

        } else {
            if (responseData.likeId != 0) {
                console.log("ButtonLength : " + ButtonsLength);
                Buttons[ButtonsLength + index].innerHTML += `
                <button type="button" class="like-buttons dislike-button">
                <i class="fa-solid fa-heart"></i>
                </button>
                `;
            } else {
                Buttons[ButtonsLength + index].innerHTML += `
                    <button type="button" class="like-buttons like-button">
                    <i class="fa-regular fa-heart"></i>
                    </button>
                `;
            }
            ComponentEvent.getInstance().addClickEventLikeButtons();
        }
    }

    loadEmoAndImageData() {
        const responseData = DetailApi.getInstance().getEmoAndImage()

        console.log(responseData)
        if (responseData.emoImage != null) {
            imgObj.imageId = responseData.emoImage.imageId
            imgObj.emoCode = responseData.emoImage.emoCode
            imgObj.saveName = responseData.emoImage.saveName
            imgObj.originName = responseData.emoImage.originName

            const emoImg = document.querySelectorAll(".subemoticon-number")

            responseData.emoImage.forEach((imgObj, index) => {
                emoImg[index].src = "http://127.0.0.1:8000/image/emo/" + imgObj.saveName;
            })

        }
    }



}

class ImgFileService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ImgFileService();
        }
        return this.#instance
    }

    //파일 이미지 src 경로 넣어준다 
    getImgPreview() {
        const emoImgs = document.querySelectorAll(".emo-img");
        console.log(fileObj.files)
        fileObj.files.forEach((imgFile, index) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                emoImgs[index].src = e.target.result;
            }

            reader.readAsDataURL(imgFile);
        });


    }

}

class ComponentEvent {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ComponentEvent()
        }
        return this.#instance
    }

    addClickEventLikeButtons() {
        const likeButtons = document.querySelectorAll(".like-buttons");
        const emoIds = document.querySelectorAll(".emo-id");

        likeButtons.forEach((button, index) => {
            button.onclick = () => {
                if (button.classList.contains("like-button")) {
                    const likeCount = DetailApi.getInstance().setLike(emoIds[index].value);
                    if (likeCount != -1) {
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                    }

                } else {
                    const likeCount = DetailApi.getInstance().setDisLike(emoIds[index].value);
                    if (likeCount != -1) {
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                    }
                }
            }
        });
    }
}