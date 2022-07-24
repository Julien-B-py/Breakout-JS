const title = document.createElement("h1");
title.textContent = "BREAKOUT.JS";
document.body.appendChild(title);
const startBtn = document.createElement("button");
startBtn.textContent = "Start";
document.body.appendChild(startBtn);

startBtn.addEventListener("click", function () {

    title.remove();
    this.remove();

    const player = new Paddle("#e34863");
    const gameWindow = new Window();
    const sound = new Sound();
    const ball = new Ball("#f6f7f3", sound, player);

    document.addEventListener("keydown", function (e) {

        if (e.which === 81) return player.moveLeft();
        if (e.which === 68) return player.moveRight(gameWindow);

    })

    window.addEventListener("resize", function () {
        gameWindow.resize();
    })

    setInterval(() => { ball.move(gameWindow) }, 16);

})





