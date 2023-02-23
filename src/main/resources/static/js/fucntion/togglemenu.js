window.onload = () => {
ComponentEvent.getInstance().addToggleButtonclickEvnet();
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addToggleButtonclickEvnet() {
        const toggleButton = document.querySelector(".toggle-button");
        const menuAside = document.querySelector(".menu.aside");


        toggleButton.onclick = () => {
            toggleButton.fadeOut();
            menuAside.fadein();

        }
    }

}