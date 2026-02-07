class AudioControls {
constructor() {
    this.jump = document.getElementById("jump");
    this.charge = document.getElementById("charge");
}
play(sound) {
    sound.currentTime = 0;
    sound.play();
}
}