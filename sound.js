class Sound {

    // Called by new operator
    constructor() {
        // Instance properties
        this.sounds = {
            "hit": new Audio("./sounds/brick_hit.ogg"),
            "player": new Audio("./sounds/paddle_bounce.ogg"),
            "wall": new Audio("./sounds/wall_bounce.ogg"),
        }
    }

    // Public methods
    play(audio) {
        this.sounds[audio].play();
    }

}