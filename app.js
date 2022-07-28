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

let controlType = 0;
let gameLoop;

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


    switch (controlType) {
        case 0:
            document.addEventListener('mousemove', function (e) {

                let mouseX = e.pageX;
                player.move(mouseX, gameWindow);

            });
            break;
        case 1:
            document.addEventListener("keydown", function (e) {

                if (e.which === 81) return player.moveLeft();
                if (e.which === 68) return player.moveRight(gameWindow);

            });
            break;
    }





    gameLoop = setInterval(() => { ball.move(gameWindow) }, 1);

});

// Get the modal
const modal = document.querySelector(".modal");
const controlsSelect = document.querySelector("select");
controlsSelect.selectedIndex = controlType;

controlsSelect.addEventListener("input", function () {
    controlType = Number(this.value);
})

optionBtn.addEventListener("click", function () {
    modal.style.display = "block";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



