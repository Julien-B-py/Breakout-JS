const title = document.createElement("h1");
title.textContent = "BREAKOUT.JS";
document.body.appendChild(title);
const buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("main__menu");
const startBtn = document.createElement("button");
const startBtnIcon = document.createElement("i");
startBtnIcon.classList.add("fa-solid", "fa-play");
const startBtnText = document.createTextNode("Play");
startBtn.appendChild(startBtnText);
startBtn.appendChild(startBtnIcon);
const optionBtn = document.createElement("button");
const optionBtnIcon = document.createElement("i");
optionBtnIcon.classList.add("fa-solid", "fa-gear");
const optionBtnText = document.createTextNode("Options");
optionBtn.appendChild(optionBtnText);
optionBtn.appendChild(optionBtnIcon);
buttonsDiv.appendChild(startBtn);
buttonsDiv.appendChild(optionBtn);
document.body.appendChild(buttonsDiv);

function hideMenu() {
    title.remove();
    buttonsDiv.remove();
}

function showMenu() {

    document.querySelectorAll("span").forEach(span => span.remove());
    document.querySelector(".paddle").remove();
    document.querySelector(".ball").remove();
    document.querySelectorAll(".brick").forEach(brick => brick.remove());
    document.body.appendChild(title);
    document.body.appendChild(buttonsDiv);

}

let gameLoop;
let options;

let moveLeftRequest = false;
let moveRightRequest = false;

startBtn.addEventListener("click", function () {

    hideMenu();

    const player = new Paddle();

    let allBricks = [];
    for (let i = 0; i < Brick.perRow; i++) {
        for (let j = 0; j < Brick.rows; j++) {
            const brick = new Brick(i, j);
            allBricks.push(brick);
        }
    }

    const gameWindow = new Window();
    const sound = new Sound();
    const ball = new Ball(sound, player, allBricks);

    window.addEventListener("resize", function () {
        gameWindow.resize();
    });


    switch (Options.controlType) {
        case 0:
            document.addEventListener('mousemove', function (e) {

                let mouseX = e.pageX;
                player.move(mouseX, gameWindow);

            });
            break;
        case 1:

            document.addEventListener("keydown", function (e) {

                if (e.which === 81) {
                    moveLeftRequest = true;
                    moveRightRequest = false;
                    return;
                }

                if (e.which === 68) {
                    moveRightRequest = true;
                    moveLeftRequest = false;
                    return;
                }

            });

            document.addEventListener("keyup", function (e) {
                if (e.which === 81) return moveLeftRequest = false;
                if (e.which === 68) return moveRightRequest = false;;
            })

            break;
    }



    setTimeout(function () {
        gameLoop = setInterval(() => { ball.move(gameWindow) }, 16);
    }, 1000);

    playerLoop = setInterval(() => {
        if (moveLeftRequest) return player.moveLeft();
        if (moveRightRequest) player.moveRight(gameWindow);
    }, 16);

});



optionBtn.addEventListener("click", function () {
    options = new Options();
})

