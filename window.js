class Window {
    #width = document.body.offsetWidth;
    #height = document.body.offsetHeight;

    resize() {
        this.#width = document.body.offsetWidth;
        this.#height = document.body.offsetHeight
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

}