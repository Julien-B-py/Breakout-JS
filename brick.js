class Brick {

    // Private fields, not accessible outside of class
    #brickDiv = document.createElement("div");
    #width = document.body.offsetWidth / Brick.perRow;
    #height = 20;
    #xPos;
    #yPos;

    static colors = ["#97bcbd", "#7dabac", "#64898a"];
    static perRow = 10;
    static rows = 3;

    constructor(index, row) {
        this.row = row + 1;
        this.index = index;
        this.color = Brick.colors[Math.floor(Math.random() * Brick.colors.length)]
        this.setPosition();
        this.init();
    }

    init() {
        this.#brickDiv.classList.add("brick");
        this.#brickDiv.style.width = `${this.#width}px`;
        this.#brickDiv.style.height = `${this.#height}px`;
        this.#brickDiv.style.bottom = `${this.#yPos}px`;
        this.#brickDiv.style.left = `${this.#xPos}px`;
        this.#brickDiv.style.backgroundColor = this.color;
        document.body.appendChild(this.#brickDiv);
    }

    setPosition() {

        this.#xPos = this.#width * this.index;
        this.#yPos = document.body.offsetHeight - this.#height * this.row;

    }

    kill() {
        this.#brickDiv.remove();
    }



    get rect() {
        return {
            x: this.#xPos,
            y: this.#yPos,
            width: this.#width,
            height: this.#height,
        };
    }



}

