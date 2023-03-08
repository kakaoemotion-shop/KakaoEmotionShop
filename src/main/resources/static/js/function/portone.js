
window.onload = () => {
    ImportApi.getInstance().purchaseButton();
    
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
        amount: 14000,
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456'
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


    purchaseButton(){
        const purchaseButton = document.querySelector(".purchase-button");
        purchaseButton.onclick = () => {
            const inputs = document.querySelectorAll(".product-input");
            ImportApi.getInstance().importPayParams.name = inputs[0].value;
            ImportApi.getInstance().importPayParams.amount = inputs[1].value;
            ImportApi.getInstance().requestPay();
            console.log(purchaseButton);
        }
    }
}