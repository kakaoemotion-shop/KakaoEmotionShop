window.onload = () => {
    ToggleService.getInstance().loadlogin();

    ToggleButton.getInstance().logoutButton();
    ToggleButton.getInstance().toggleButton();

    DetailService.getInstance().setEmoCode()
    DetailService.getInstance().loadEmoImageOne()
    DetailService.getInstance().loadEmoAndImageData()
}

const emoObj = {
    emoId:"",
    emoCode: "",
    emoName: "",
    company: "",
    emoDate: ""
}
const emoObj2 = {
    emoId:"",
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

    getEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/emo/${emoObj.emoCode}`,
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

    getLikeStatus() {
        let likeStatus = -1;
        
        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/like/${emoObj2.emoId}/status`,
            dataType: "json",
            success: response => {
                likeStatus = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return likeStatus;
    }

    setLike() {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/emo/${emoObj2.emoId}/like`,
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

    setDisLike() {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "delete",
            url: `http://127.0.0.1:8000/api/emo/${emoObj2.emoId}/like`,
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
        emoObj.emoCode = URLSearch.get("emoCode")
        emoObj2.emoCode = URLSearch.get("emoCode")
        emoObj.emoId = DetailApi.getInstance().getEmo().emoId;
        emoObj2.emoId = DetailApi.getInstance().getEmo().emoId;

    }
    
    clearEmoList() {
        const contentFlex = document.querySelector(".emoticon-area");
        contentFlex.innerHTML = "";
    }


    loadEmoImageOne() {
        const responseData = DetailApi.getInstance().getEmoAndImageOne();
        const emoticonArea = document.querySelector(".emoticon-area");
        const principal = PrincipalApi.getInstance().getPrincipal();
        const likeStatus = DetailApi.getInstance().getLikeStatus();
        const disLikeData = DetailApi.getInstance().setDisLike();
    
        emoticonArea.innerHTML = `
            <div class="emoticon-product">
            <input type="hidden" class="emo-id" value="${responseData.emoMst.emoId}">
            <input type="hidden" class="like-count" value="${responseData.emoMst.likeCount}">
                <div class="emoticon-box">
                    <div class="emoticon-thumb">
                        <img class="main-emoticon"
                            src="http://127.0.0.1:8000/image/emo/${responseData.emoImage[0].saveName!= null ? responseData.emoImage[0].saveName :"noimg.png"}"
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
                        
                            </div>
                        </div>
                    </div>
                    <button class="purchase-button">구매하기</button>
                </div>
            </div>
        `;

        const Buttons = document.querySelector(".right-like-box")

        if(principal == null) {
                
            Buttons.innerHTML += `
            <button type="button" class="no-login-like like-button ">
                <i class="fa-regular fa-heart empty-heart"></i>
            </button>
            `;
            ComponentEvent.getInstance().addClickEventLikeButtonsNoLogin();

        }else {              
            if(likeStatus != 0){
                Buttons.innerHTML += `
                <button type="button" class="like-buttons dislike-button">
                    <i class="fa-solid fa-heart full-heart"></i>
                </button>
                `;
            }else {
                Buttons.innerHTML += `
                    <button type="button" class="like-buttons like-button">
                        <i class="fa-regular fa-heart empty-heart"></i>
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

            const emoImg = document.querySelectorAll(".subemoticon-img")

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
        const likeButtons = document.querySelector(".like-buttons");

        likeButtons.onclick = () => {
            if(likeButtons.classList.contains("like-button")){
                const likeCount = DetailApi.getInstance().setLike();
                if(likeCount != -1){
                    likeButtons.classList.remove("like-button");
                    likeButtons.classList.add("dislike-button");
                }
                
            }else {
                const likeCount = DetailApi.getInstance().setDisLike();
                if(likeCount != -1){
                    likeButtons.classList.remove("dislike-button");
                    likeButtons.classList.add("like-button");
                }
            }
        }
    }

    addClickEventLikeButtonsNoLogin() {
        const likeButtonError = document.querySelectorAll(".no-login-like");
        const emoIds = document.querySelectorAll(".emo-id");

        likeButtonError.forEach((button, index) => {
            button.onclick = () => {
                
                if (confirm("로그인 후 사용 가능합니다")) {
                    location.href = "/account/login"
                }   
            }
        });
    }
}

class ImportApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ImportApi();
        }
        return this.#instance;
    }


    IMP = null;

    importInfo = {
        impUid: "imp52178410",
        restApikey: "3152048328612243",
        restApiSecret: "ruBsQPZhs6UhDZqu5LNfvOreTCqR7amjBllCcYz34tf3b9pqD7HlpebIe6CIwBsZiTOikcbqxEysudsz"
    }

    importPayParams = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: 'merchant_' + new Date().getTime(), //현재 날짜와 키값
        name: '결제테스트',
        amount: 2000,
        buyer_email: '',
        buyer_name: ''
        // buyer_tel: '',
        // buyer_addr: '서울특별시 강남구 삼성동',
        // buyer_postcode: '123-456'
    }

    constructor() {
        this.IMP = window.IMP;
        this.IMP.init(this.importInfo.impUid);
    }

    requestPay() {
        this.IMP.request_pay(this.importPayParams, this.responsePay);
    }

    responsePay(resp) {
        console.log(resp);
        if (resp.success) {
            alert("결제 성공");
        } else {
            alert("결제 실패");
            console.log(resp);
        }
    }


    purchaseButton() {
        const purchaseButton = document.querySelector(".purchase-button");
        const principal = PrincipalApi.getInstance().getPrincipal();
        const inputs = document.querySelectorAll(".product-input");


        purchaseButton.onclick = () => {
            if (principal == null) {
                if (confirm("로그인 후 사용 가능합니다")) {
                    location.href = "/account/login"
                }
            }else{
                ImportApi.getInstance().importPayParams.name = inputs[0].value;
                ImportApi.getInstance().requestPay();
            }
        }
        console.log(purchaseButton);
    }
}