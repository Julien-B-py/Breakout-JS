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

let controlType = 0;

startBtn.addEventListener("click", function () {

    title.remove();
    buttonsDiv.remove();

    const player = new Paddle("#e34863");
    const gameWindow = new Window();
    const sound = new Sound();
    const ball = new Ball("#f6f7f3", sound, player);

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





    setInterval(() => { ball.move(gameWindow) }, 16);

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



