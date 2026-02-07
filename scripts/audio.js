class AudioControls {
constructor() {
    this.music = document.getElementById("music");
    this.jump = document.getElementById("jump");
    this.charge = document.getElementById("charge");
    this.lose = document.getElementById("lose");
    this.win = document.getElementById("win");
}
play(sound) {
    sound.currentTime = 0;
    sound.play();
}
}