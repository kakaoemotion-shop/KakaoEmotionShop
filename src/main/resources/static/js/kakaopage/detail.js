window.onload = () => {
    ToggleService.getInstance().loadlogin();
    ToggleButton.getInstance().logoutButton();
    ToggleButton.getInstance().mypagLinkButton();
    ToggleButton.getInstance().toggleButton();

    DetailService.getInstance().setEmoCode()
    DetailService.getInstance().loadEmoImageOne()
    DetailService.getInstance().loadEmoAndImageData()

    ImportApi.getInstance().purchaseButton();


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
                    <div class="charge">
                        <input type="text" class="product-input" value= "${responseData.emoMst.emoName}"><br>
                        <input type="text" class="product-input" value="2000">
                    </div>
                        <button type="button" class="purchase-button">구매하기</button>
                </div>
            </div>

        `;

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

class ImportApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ImportApi();
        }
        return this.#instance;
    }

    register(buyer) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/buyer/register",
            contentType: "application/json",
            data: JSON.stringify(buyer),
            dataType: "json",
            success: response => {
                console.log(response);
                alert("구매 등록완료")
            },
            error: error => {
                console.log(error);

            }
        });
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
        name: '',
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
                const principal = PrincipalApi.getInstance().getPrincipal();
                const responseData = DetailApi.getInstance().getEmoAndImage();
                const usernameValue = principal.user.username;
                const nameValue = principal.user.name;
                const emailValue = principal.user.email;
                const emoNameValue = responseData.emoMst.emoName;
                
                const buyer = new Buyer(usernameValue, nameValue, emailValue, emoNameValue);
                
                
                ImportApi.getInstance().register(buyer);
        } else {
            alert("결제 실패");
            console.log(resp);
        }
    }


    purchaseButton() {
        const purchaseButton = document.querySelector(".purchase-button");
        const principal = PrincipalApi.getInstance().getPrincipal();
        const responseData = DetailApi.getInstance().getEmoAndImage()
        const inputs = document.querySelectorAll(".product-input");


        purchaseButton.onclick = () => {
            if (principal == null) {
                if (confirm("로그인 후 사용 가능합니다")) {
                    location.href = "/account/login"
                }else{
                
                }

            }else{
                // const usernameValue = principal.user.username;
                // const nameValue = principal.user.name;
                // const emailValue = principal.user.email;
                // const emoNameValue = responseData.emoMst.emoName;
                
                // const buyer = new Buyer(usernameValue, nameValue, emailValue, emoNameValue);
                
                ImportApi.getInstance().requestPay();
                // ImportApi.getInstance().register(buyer);
                ImportApi.getInstance().importPayParams.name = responseData.emoMst.emoName;
                ImportApi.getInstance().importPayParams.buyer_name = principal.user.username;
                ImportApi.getInstance().importPayParams.buyer_email = principal.user.email;
            }
        }
        console.log(purchaseButton);
    }
}

class Buyer {
    username = null;
    name = null;
    email = null;
    emoName = null;

    constructor(username, name, email, emoName) {
      this.username = username;
      this.name = name;
      this.email = email;
      this.emoName = emoName;
    }
}