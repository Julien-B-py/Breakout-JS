class Paddle {

    // Private fields, not accessible outside of class
    #paddleDiv = document.createElement("div");
    #width = 150;
    #height = 20;
    #xPos = (document.body.offsetWidth - this.#width) / 2;
    #yPos = 0;
    #velocity = 30;

    // Called by new operator
    constructor() {
        // Instance properties
        this.color = "#e34863";
        this.init();
    }

    // Public methods
    init() {
        this.#paddleDiv.classList.add("paddle");
        this.#paddleDiv.style.width = `${this.#width}px`;
        this.#paddleDiv.style.height = `${this.#height}px`;
        this.#paddleDiv.style.bottom = `${this.#yPos}px`;
        this.#paddleDiv.style.left = `${this.#xPos}px`;
        this.#paddleDiv.style.backgroundColor = this.color;
        document.body.appendChild(this.#paddleDiv);
    }

    move(x, gameWindow) {
        this.#xPos = (x >= (gameWindow.width - this.#width)) ? gameWindow.width - this.#width : x;
        this.#updatePosition();
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

    // Getter methods
    get center() {
        return {
            x: this.#xPos + (this.#width / 2),
            y: this.#yPos + (this.#height / 2)
        };
    }

    // Get paddle sections for variable ball bounce
    get sectionsPos() {
        return {
            1: [this.#xPos, this.#width / 7 + this.#xPos, -9],
            2: [this.#width / 7 + this.#xPos, 2 * this.#width / 7 + this.#xPos, -6],
            3: [2 * this.#width / 7 + this.#xPos, 3 * this.#width / 7 + this.#xPos, -3],
            4: [3 * this.#width / 7 + this.#xPos, 4 * this.#width / 7 + this.#xPos, 0],
            5: [4 * this.#width / 7 + this.#xPos, 5 * this.#width / 7 + this.#xPos, 3],
            6: [5 * this.#width / 7 + this.#xPos, 6 * this.#width / 7 + this.#xPos, 6],
            7: [6 * this.#width / 7 + this.#xPos, this.#width + this.#xPos, 9],
        }
    }

    get rect() {
        return {
            x: this.#xPos,
            y: this.#yPos,
            width: this.#width,
            height: this.#height,
        };
    }

    // Private methods
    #updatePosition() {
        this.#paddleDiv.style.left = `${this.#xPos}px`;
    }

}

