class Window {

    // Private fields, not accessible outside of class
    #width = window.innerWidth;
    #height = window.innerHeight;

    // Public methods
    resize() {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;
    }

    // Getter methods
    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

}