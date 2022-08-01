class Ball {

    // Private fields, not accessible outside of class
    #ballDiv = document.createElement("div");
    #bouncesSpan = document.createElement("span");
    #radius = 10;
    #width = this.#radius * 2;
    #height = this.#radius * 2;
    // Random starting xPosition
    #xPos = this.#defineStartingX();
    // #xPos = 192;
    // Random starting yPosition
    #yPos = this.#defineStartingY();
    // #yPos = 100;
    #xVelocity = Math.random() < 0.5 ? - 3 : 3;
    // #xVelocity = 0;
    #yVelocity = -10;
    #bounces = 0;

    // Called by new operator
    constructor(sound, player, bricks) {
        // Instance properties
        this.color = "#f6f7f3";
        this.sound = sound;
        this.player = player;
        this.bricks = bricks;
        this.init();
    }

    // Public methods
    init() {
        this.#ballDiv.classList.add("ball");
        this.#ballDiv.style.width = `${this.#width}px`;
        this.#ballDiv.style.height = `${this.#height}px`;

        this.#ballDiv.style.bottom = `${this.#yPos}px`;
        this.#ballDiv.style.left = `${this.#xPos}px`;

        this.#ballDiv.style.backgroundColor = this.color;

        this.#bouncesSpan.textContent = this.#bounces;

        document.body.appendChild(this.#ballDiv);
        document.body.appendChild(this.#bouncesSpan);
    }

    move(gameWindow) {

        for (const brick of this.bricks) {

            let brickRect = brick.rect;


            // // Handle lateral brick collisions
            // if (this.#yPos >= brickRect.y && this.#yPos <= (brickRect.y + brickRect.height) && (Math.abs(brickRect.x - this.#xPos) <= this.#width || Math.abs(brickRect.x + brickRect.width - this.#xPos) <= this.#width)) {
            //     this.bounce("x", "hit");
            //     brick.kill();
            //     const index = this.bricks.indexOf(brick);
            //     if (index > -1) this.bricks.splice(index, 1);
            //     break;
            // }


            // WORKING
            // Handle bottom brick collisions
            // If ball x position is between brick horizontal limits and is hitting the bottom of the brick
            if (((this.#xPos + this.#width + this.#xVelocity) >= brickRect.x)
                && ((this.#xPos + this.#xVelocity) <= (brickRect.x + brickRect.width))
                && ((this.#yPos + this.#height + this.#yVelocity - brickRect.y) >= 0)) {
                // console.log(brick)
                // alert(111);

                this.bounce("y", "hit");
                brick.kill();
                const index = this.bricks.indexOf(brick);
                if (index > -1) this.bricks.splice(index, 1);
            }

        }



        if (this.collideWithPlayerH()) return this.bounce("y", "player");

        if (this.collideWithHorizontalWall(gameWindow)) return this.bounce("y", "wall");

        if (this.collideWithVerticalWall(gameWindow)) return this.bounce("x", "wall");

        this.#xPos += this.#xVelocity;
        this.#yPos += this.#yVelocity;

        this.#updatePosition();

        if (this.#yPos + this.#height <= 0) {
            clearInterval(gameLoop);
            showMenu();
        }

    }

    bounce(axis, sound) {

        this.#bounces += 1;

        if (this.#bounces % 10 === 0) this.#accelerate();

        this.#bouncesSpan.textContent = this.#bounces;

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

        // If the bottom of the ball + his velocity is equal to paddle height, it means they are in horizontal contact
        // If the center of the ball is between paddle.x and paddle.x + paddle.width, it means the ball is in the vertical range of the paddle
        // If both conditions are met, we can tell ball is touching the paddle
        if (this.#yPos + this.#yVelocity <= height && this.center.x >= x && this.center.x <= x + width) {
            // We adjust ball position to make it touch the paddle in Y axis
            this.#yPos = height;
            this.#updatePosition();

            // We check which section of the paddle has been touched by the ball to reflect accordingly
            for (const item of Object.entries(this.player.sectionsPos)) {
                const range = item[1];
                if (this.center.x >= range[0] && this.center.x <= range[1]) this.#xVelocity = range[2];
            }

            return true;

        }

    }

    collideWithVerticalWall(gameWindow) {

        if (this.#xPos + this.#xVelocity <= 0) {
            this.#xPos = 0;
            this.#updatePosition();
            // alert(this.#xPos)
            return true;
        }

        if (this.#xPos + this.#width + this.#xVelocity >= gameWindow.width) {
            this.#xPos = gameWindow.width - this.#width;
            // // alert(this.#xPos)
            this.#updatePosition();
            return true;
        }

    }


    collideWithHorizontalWall(gameWindow) {

        if (this.#yPos + this.#height + this.#yVelocity >= gameWindow.height) {
            this.#yPos = gameWindow.height - this.#height;
            this.#updatePosition();
            return true;
        }

    }

    // Private methods
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

    #accelerate() {
        this.#yVelocity *= 1.1;
        this.#xVelocity *= 1.1;
        this.#yVelocity = Math.round(this.#yVelocity);
        this.#xVelocity = Math.round(this.#xVelocity);
    }

    // Getter methods
    get center() {
        return {
            x: this.#xPos + (this.#width / 2),
            y: this.#yPos + (this.#height / 2)
        };
    }

}