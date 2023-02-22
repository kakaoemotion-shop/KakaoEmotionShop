window.onload = () => {
    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventImgAddButton();
    ComponentEvent.getInstance().addChangeEventImgFile();
    ComponentEvent.getInstance().addClickEventImgRegisterButton();
    ComponentEvent.getInstance().addClickEventImgCancelButton();
}

const emoObj = {
    emoCode: "",
    emoName: "",
    company: "",
    emoDate: ""
}

const fileObj = {
    files: new Array(),
    formData: new FormData()
}

class EmoRegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new EmoRegisterApi();
        }
        return this.#instance;
    }

    registerEmo() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/emo",
            contentType: "application/json",
            data: JSON.stringify(emoObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                // EmoRegisterService.getInstance().setErrors(error.responseJSON.data);
            }
        });

        return successFlag;
    }

    registerImg() {

        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/admin/emo/${emoObj.emoCode}/images`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                alert("이모티콘 이미지 등록 완료");
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
    }
}

class EmoRegisterService {
    static #instance = null;
    static getInstance() {
        if(this.instance == null) {
        this.#instance = new EmoRegisterService();
        }
        return this.#instance;
    }

    setEmoObjValues() {
        const registerInputs = document.querySelectorAll(".register-input");

        emoObj.emoCode = registerInputs[0].value;
        emoObj.emoName = registerInputs[1].value;
        emoObj.company = registerInputs[2].value;
        emoObj.emoDate = registerInputs[3].value;
    }

    setErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearErrors();

        Object.keys(errors).forEach(key => {
            if(key == "emoCode") {
                errorMessages[0].innerHTML = errors[key];
            }else if(key == "emoName") {
                errorMessages[1].innerHTML = errors[key];
            }else if(key == "company") {
                errorMessages[2].innerHTML = errors[key];
            }else if(key == "emoDate") {
                errorMessages[3].innerHTML = errors[key];
            }
        })
    }

    clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        });
    }
}

class ImgFileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImgFileService();
        }
        return this.#instance;
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

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-btn");

        registerButton.onclick = () => {
            EmoRegisterService.getInstance().setEmoObjValues();
            const successFlag = EmoRegisterApi.getInstance().registerEmo();

            if(!successFlag) {
                return;
            }

            if(confirm("이미지를 등록하시겠습니까?")) {
                const imgAddButton = document.querySelector(".img-add-button");
                const imgCancelButton = document.querySelector(".img-cancel-button");

                imgAddButton.disabled = false;
                imgCancelButton.disabled = false;
            }else{
                location.reload();
            }
        }
    }

    addClickEventImgAddButton() {
        const imgFile = document.querySelector(".img-file")
        const addButton = document.querySelector(".img-add-button")

        addButton.onclick = () => {
            imgFile.click();
        }
    }

    addChangeEventImgFile() {
        const imgFile = document.querySelector(".img-file");

        imgFile.onchange = () => {
            const formData = new FormData(document.querySelector(".img-form"));
            let changeFlag = false;

            fileObj.files.pop();

            formData.forEach(value => {
                console.log(value);

                if(value.size != 0) {
                    fileObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                const imgRegisterButton = document.querySelector(".img-register-button");
                imgRegisterButton.disabled = false;

                ImgFileService.getInstance().getImgPreview();
                imgFile.value = null;
            }
        }
    }

    addClickEventImgRegisterButton() {
        const imgRegisterButton = document.querySelector(".img-register-button");

        imgRegisterButton.onclick = () => {
            fileObj.formData.append("files",fileObj.files[0]);

            EmoRegisterApi.getInstance().registerImg();
        }
    }

    addClickEventImgCancelButton() {
        const imgCancelButton = document.querySelector(".img-cencel-button");

        imgCancelButton.onclick = () => {
            if(confirm("정말로 이미지 등록을 취소하시겠습니까?")) {
                location.reload();
            }
        }
    }
}