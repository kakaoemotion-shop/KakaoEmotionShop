window.onload = () => {
    EmoModificationService.getInstance().setEmoCode()
    EmoModificationService.getInstance().loadEmoAndImageData()

    // ComponentEvent.getInstance().addClickEventImgOnChangeButton()
    ComponentEvent.getInstance().addClickEventModificationButton()
    ComponentEvent.getInstance().addClickEventImgAddButton()
    ComponentEvent.getInstance().addChangeEventImgFile()
    ComponentEvent.getInstance().addClickEventImgModificationButton()
    ComponentEvent.getInstance().addClickEventImgCancelButton()

}

const emoObj = {
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

const fileObj = {
    files: new Array(),
    formData: new FormData()
}

class EmoModificationApi {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoModificationApi()
        }
        return this.#instance
    }
    //이미지, 이모티콘 정보 들고오기 
    getEmoAndImage() {
        let responseData = null

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/emos/${emoObj.emoCode}`,
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


    //emoticon 정보변경 (이미지x)
    modifyEmo() {
        let successFlag = false

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/admin/emo/${emoObj.emoCode}`,
            contentType: "application/json",
            data: JSON.stringify(emoObj),
            dataType: "json",
            success: response => {
                successFlag = true
            },
            error: error => {
                console.log(error)
            }

        })

        return successFlag
    }
    //이미지 제거
    removeImg() {
        let successFlag = false

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/emo/${emoObj.emoCode}/image/${imgObj.imageId}`,
            dataType: "json",
            success: response => {
                successFlag = true
            },
            error: error => {
                console.log(error)
            }

        })
        return successFlag
    }
    //이미지 등록
    registerImg() {

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/admin/emo/${emoObj.emoCode}/images`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                alert("이모티콘 이미지 수정 완료.")
                location.reload()
            },
            error: error => {
                console.log(error)
            }

        })
    }
}


class EmoModificationService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoModificationService();
        }
        return this.#instance
    }

    setEmoCode() {
        const URLSearch = new URLSearchParams(location.search)
        emoObj.emoCode = URLSearch.get("emoCode")
    }

    setEmoObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input")

        emoObj.emoCode = modificationInputs[0].value
        emoObj.emoName = modificationInputs[1].value
        emoObj.company = modificationInputs[2].value
        emoObj.emoDate = modificationInputs[3].value
    }

    //이미지, 데이터 로딩 
    loadEmoAndImageData() {
        const responseData = EmoModificationApi.getInstance().getEmoAndImage()

        if (responseData.emoMst == null) {
            alert("해당 도서코드는 등록되지 않은 코드입니다")
            history.back()
            return
        }

        const modificationInputs = document.querySelectorAll(".modification-input")
        modificationInputs[0].value = responseData.emoMst.emoCode
        modificationInputs[1].value = responseData.emoMst.emoName
        modificationInputs[2].value = responseData.emoMst.company
        modificationInputs[3].value = responseData.emoMst.emoDate

        console.log(responseData)
        if (responseData.emoImage != null) {
            imgObj.imageId = responseData.emoImage.imageId
            imgObj.emoCode = responseData.emoImage.emoCode
            imgObj.saveName = responseData.emoImage.saveName
            imgObj.originName = responseData.emoImage.originName


            const emoImg = document.querySelectorAll(".emo-img")
            
            responseData.emoImage.forEach((imgObj, index) => {
                emoImg[index].src = "http://localhost:8000/image/emo/" + imgObj.saveName;
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


    addClickEventModificationButton() {
        const modificationButton = document.querySelector(".modification-btn")

        modificationButton.onclick = () => {

            EmoModificationService.getInstance().setEmoObjValues()
            const successFlag = EmoModificationApi.getInstance().modifyEmo()

            if (!successFlag) {
                return
            }

            if (confirm("이모티콘 이미지를 수정하시겠습니까?")) {
                const imgAddButtons = document.querySelectorAll(".img-add-button")
                const imgcancelButton = document.querySelector(".img-cencel-button")

                imgcancelButton.disabled = false

                imgAddButtons.forEach((button, index) => {
                    const imgFiles = document.querySelectorAll(".img-file")
                    imgAddButtons[0].disabled = false 
                    imgFiles.onchange = ((imgObj, index) => {
                        imgFiles[0]
                        imgAddButtons
                    }) 
                        
                    
                    

                    
                    // button.disabled = true;
                    // const imgFiles = document.querySelectorAll(".img-file");
                    // button.onclick = () => {
                    //     imgFiles[index].click();
                    // }
                })
            } else {
                location.reload()
            }
        }
    }

    addClickEventImgAddButton() {
        const imgFile = document.querySelectorAll(".img-file")
        const addButton = document.querySelectorAll(".img-add-button")

        addButton.onclick = () => {
            imgFile.click()
        }

    }

    addChangeEventImgFile() {
        const imgFiles = document.querySelectorAll(".img-file")

        imgFiles.forEach((imgFile) => {
            imgFile.onchange = () => {
                const formData = new FormData(document.querySelector(".img-form"));
                let changeFlag = false;

                fileObj.files.pop();

                formData.forEach((value, key) => {
                    console.log(value)
                    console.log(key)

                    if (value.size != 0) {
                        fileObj.files.push(value);
                        changeFlag = true;
                    }
                });

                if (changeFlag) {
                    const imgRegisterButton = document.querySelector(".img-modification-button");
                    imgRegisterButton.disabled = false;

                    ImgFileService.getInstance().getImgPreview();
                }
            };
        });
    }

    addClickEventImgOnChangeButton() {
        const imgModificationButton = document.querySelector(".img-modification-button");

        imgModificationButton.onclick = () => {
            fileObj.formData.append("files", fileObj.files[0]);
            
            let successFlag = true;

            if(imgObj.imageId != null) {
                successFlag = EmoModificationApi.getInstance().removeImg();
            }

            if(successFlag) {
                EmoModificationApi.getInstance().registerImg();
            }
            
        }
    }
 
    addClickEventImgModificationButton() {
        const imgModificationButton = document.querySelector(".img-modification-button")

        imgModificationButton.onclick = () => {
            for (let i = 0; i < fileObj.files.length; i++) {
                fileObj.formData.append("files", fileObj.files[i]);
            }
            EmoModificationApi.getInstance().registerImg();
        }
    }

    addClickEventImgCancelButton() {
        const imgCancelButton = document.querySelector(".img-cencel-button")

        imgCancelButton.onclick = () => {
            if (confirm("정말로 이미지 수정을 취소하시겠습니까?")) {
                location.reload()
            }
        }
    }


    
}