const title = document.createElement("h1");
const titleText = "BREAKOUT.JS";
const titleTextArray = titleText.split('');
const lastTitleLetterIndex = titleTextArray.length - 1;

let transitionCount = 0;

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

const slideIn = (element, elementIndex) => {

    setTimeout(() => {
        element.classList.add("visible");
    }, 75 * elementIndex);

}

const rollDown = () => {

    let letters = document.querySelectorAll("h1 span");
    setTimeout(() => {
        letters.forEach(letter => letter.style.setProperty('--clip-path', "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"));
    }, 150);

}

const scaleIn = () => {

    let buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) =>
        setTimeout(() => {
            button.classList.add("visible");
        }, 75 * index));

}

titleTextArray.forEach((letter, index) => {

    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.dataset.text = letter;
    title.appendChild(letterSpan);

    letterSpan.ontransitionend = () => {

        transitionCount++;

        if (transitionCount === titleTextArray.length * 2) rollDown();

        if (transitionCount === titleTextArray.length * 3) scaleIn();

    }

    slideIn(letterSpan, index);

})


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

let player;
let gameWindow;



startBtn.addEventListener("click", function () {

    hideMenu();

    player = new Paddle();

    let allBricks = generateBricks();

    gameWindow = new Window();
    const sound = new Sound();
    const ball = new Ball(sound, player, allBricks);

    window.addEventListener("resize", function () {
        gameWindow.resize();
    });


    switch (Options.controlType) {
        case 0:
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("keyup", handleKeyRelease);
            document.addEventListener('mousemove', handleMouseMove);
            break;
        case 1:
            document.removeEventListener('mousemove', handleMouseMove);
            document.addEventListener("keydown", handleKeyPress);
            document.addEventListener("keyup", handleKeyRelease);
            break;
    }



    setTimeout(() => {

        gameLoop = setInterval(() => {
            if (!allBricks.length) alert("YOU WIN");
            if (moveLeftRequest) player.moveLeft();
            if (moveRightRequest) player.moveRight(gameWindow);
            ball.move(gameWindow);
        }, 1);

    }, 1000);

});

function handleKeyPress(e) {

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

}

function handleKeyRelease(e) {

    if (e.which === 81) return moveLeftRequest = false;
    if (e.which === 68) return moveRightRequest = false;

}

function handleMouseMove(event) {
    let mouseX = event.pageX;
    player.move(mouseX, gameWindow);
}

function generateBricks() {
    let bricks = [];
    for (let i = 0; i < Brick.perRow; i++) {
        for (let j = 0; j < Brick.rows; j++) {
            const brick = new Brick(i, j);
            bricks.push(brick);
        }
    }
    return bricks;
}

optionBtn.addEventListener("click", function () {
    options = new Options();
})

