class Ball {

    #ballDiv = document.createElement("div");
    #radius = 10;
    #width = this.#radius * 2;
    #height = this.#radius * 2;

    // Random starting xPosition
    #xPos = this.#defineStartingX();
    // Random starting yPosition
    #yPos = this.#defineStartingY();

    #xVelocity = (Math.random() < 0.5) ? - 3 : 3;
    #yVelocity = -10;
    #bounces = 0;

    constructor(color, sound, player, bricks) {
        this.color = color;
        this.sound = sound;
        this.player = player;
        this.bricks = bricks;
        this.init();
    }

    init() {
        this.#ballDiv.classList.add("ball");
        this.#ballDiv.style.width = `${this.#width}px`;
        this.#ballDiv.style.height = `${this.#height}px`;

        this.#ballDiv.style.bottom = `${this.#yPos}px`;
        this.#ballDiv.style.left = `${this.#xPos}px`;

        this.#ballDiv.style.backgroundColor = this.color;
        document.body.appendChild(this.#ballDiv);
    }



    changeColor() {

    }

    move(gameWindow) {

        for (const brick of this.bricks) {

            let brickRect = brick.rect;

            // Handle lateral brick collisions
            if (this.#yPos >= brickRect.y && this.#yPos <= (brickRect.y + brickRect.height) && (Math.abs(brickRect.x - this.#xPos) <= this.#width || Math.abs(brickRect.x + brickRect.width - this.#xPos) <= this.#width)) {
                this.bounce("x", "hit");
                brick.kill();
                const index = this.bricks.indexOf(brick);
                if (index > -1) this.bricks.splice(index, 1);
                break;
            }

            // Handle bottom brick collisions
            if (this.#xPos >= brickRect.x && this.#xPos <= (brickRect.x + brickRect.width) && (brickRect.y - this.#yPos) <= this.#height) {
                this.bounce("y", "hit");
                brick.kill();
                const index = this.bricks.indexOf(brick);
                if (index > -1) this.bricks.splice(index, 1);
                break;
            }


        }
        if (this.collideWithPlayerH()) this.bounce("y", "player");
        if (this.collideWithHorizontalWall(gameWindow)) this.bounce("y", "wall");
        if (this.collideWithVerticalWall(gameWindow)) this.bounce("x", "wall");
        this.#xPos += this.#xVelocity;
        this.#yPos += this.#yVelocity;

        this.#updatePosition();

        if (this.#yPos + this.#height <= 0) alert("GAME OVER")

    }

    bounce(axis, sound) {

        this.#bounces += 1;
        this.sound.play(sound);

        switch (axis) {
            case "x":
                this.#xVelocity *= -1;
                break;
            case "y":
                this.#yVelocity *= -1;
                break;

        }

    }

    collideWithPlayerH() {

        const rect = this.player.rect;
        const { x, y, width, height } = rect;

        if (Math.abs(this.#yPos - y) <= height && this.#xPos >= x && this.#xPos <= x + width) {

            for (const item of Object.entries(this.player.sectionsPos)) {
                const range = item[1];
                if (this.center.x >= range[0] && this.center.x <= range[1]) this.#xVelocity = range[2];
            }

            return true;
        }

    }

    collideWithVerticalWall(gameWindow) {
        if (this.#xPos <= 0 || this.#xPos + this.#width + this.#xVelocity > gameWindow.width) return true;
    }

    collideWithHorizontalWall(gameWindow) {
        if (this.#yPos + this.#height + this.#yVelocity > gameWindow.height) return true;
        // if (this.#yPos <= 0 || this.#yPos + this.#height + this.#yVelocity > gameWindow.height) return true;
    }

    // Private method
    #updatePosition() {
        this.#ballDiv.style.left = `${this.#xPos}px`;
        this.#ballDiv.style.bottom = `${this.#yPos}px`;
    }

    #defineStartingX() {
        // Random X between 0 and screen width
        return Math.floor(Math.random() * (document.body.offsetWidth - this.#width + 1));
    }

    #defineStartingY() {
        let screenHeight = document.body.offsetHeight - this.#height - 60;
        let upperHalfScreen = screenHeight / 2;
        return Math.floor(Math.random() * (screenHeight - (upperHalfScreen) + 1)) + (upperHalfScreen);
    }

    get center() {
        return {
            x: this.#xPos + (this.#width / 2),
            y: this.#yPos + (this.#height / 2)
        };
    }

}