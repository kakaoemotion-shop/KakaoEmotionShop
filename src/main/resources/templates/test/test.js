
window.onload = () => {
    const paymentButton = document.querySelector(".payment-button");
    
    paymentButton.onclick = () => {
        const inputs = document.querySelectorAll(".product-input");
        ImportApi.getInstance().importPayParams.name = inputs[0].value;
        ImportApi.getInstance().importPayParams.price = inputs[1].value;
        ImportApi.getInstance().requestPay();
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
        name: '',
        price: '',
        buyer_email: '',
        buyer_name: ''
        // buyer_tel: '',
        // buyer_addr: '',
        // buyer_postcode: ''
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
}