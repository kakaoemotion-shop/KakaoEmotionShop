window.onload = () => {
    // EmoModificationService.getInstance().setEmoCode()
    
    DetailService.getInstance().setEmoCode()
    DetailService.getInstance().setEmoObjValues()
    DetailService.getInstance().loadEmoAndImageData()

    

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


class DetailApi {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DetailApi()
        }
        return this.#instance
    }

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
    }

    setEmoObjValues() {
        const emoticonName = document.querySelector(".emoticon-name")
        const txtAuthor = document.querySelector(".txt-author")

        emoObj.emoName = emoticonName.value
        emoObj.company = txtAuthor.value
    }
 
    loadEmoAndImageData() {
        const responseData = DetailApi.getInstance().getEmoAndImage()

        // const emoticonName = document.querySelector(".emoticon-name")
        // const txtAuthor = document.querySelector(".txt-author")
        // emoticonName.value = responseData.emoMst.emoName
        // txtAuthor.value = responseData.emoMst.company

        console.log(responseData)
        if (responseData.emoImage != null) {
            imgObj.imageId = responseData.emoImage.imageId
            imgObj.emoCode = responseData.emoImage.emoCode
            imgObj.saveName = responseData.emoImage.saveName
            imgObj.originName = responseData.emoImage.originName

            console.log(responseData)
            const emoImg = document.querySelectorAll(".subemoticon-number")
            
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


    

}