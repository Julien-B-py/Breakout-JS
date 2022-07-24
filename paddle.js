class Paddle {

    // Private fields, not accessible outside of class
    #paddleDiv = document.createElement("div");
    #width = 100;
    #height = 20;
    #xPos = 0;
    #yPos = 0;
    #velocity = 30;

    constructor(color) {
        this.color = color;
        this.init();
    }

    init() {
        this.#paddleDiv.classList.add("paddle");
        this.#paddleDiv.style.width = `${this.#width}px`;
        this.#paddleDiv.style.height = `${this.#height}px`;
        this.#paddleDiv.style.bottom = `${this.#yPos}px`;
        this.#paddleDiv.style.left = `${this.#xPos}px`;
        this.#paddleDiv.style.backgroundColor = this.color;
        document.body.appendChild(this.#paddleDiv);
    }

    moveRight(gameWindow) {
        if (this.#xPos + this.#width + this.#velocity > gameWindow.width) {
            this.#xPos = gameWindow.width - this.#width;
        } else {
            this.#xPos += this.#velocity;
        }
        this.#updatePosition();
    }

    moveLeft() {
        if (this.#xPos < this.#velocity) {
            this.#xPos = 0;
        } else {
            this.#xPos -= this.#velocity;
        }
        this.#updatePosition();
    }

    get rect() {
        return {
            x: this.#xPos,
            y: this.#yPos,
            width: this.#width,
            height: this.#height,
        };
    }

    // Private method
    #updatePosition() {
        this.#paddleDiv.style.left = `${this.#xPos}px`;
    }

}

