class Window {

    // Private fields, not accessible outside of class
    #width = document.body.offsetWidth;
    #height = document.body.offsetHeight;

    // Public methods
    resize() {
        this.#width = document.body.offsetWidth;
        this.#height = document.body.offsetHeight;
    }

    // Getter methods
    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

}