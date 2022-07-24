class Sound {

    constructor() {
        this.sounds = {
            "hit": new Audio("./sounds/brick_hit.ogg"),
            "player": new Audio("./sounds/paddle_bounce.ogg"),
            "wall": new Audio("./sounds/wall_bounce.ogg"),
        }
    }

    play(audio) {
        this.sounds[audio].play();
    }

    // stop() {
    //     this.sound.pause();
    //     this.sound.currentTime = 0;
    // }

}