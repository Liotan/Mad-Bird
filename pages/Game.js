function renderGame() {
    return `<canvas id="canvas"></canvas>

            <div class="media">
                <img id="background" src="../media/game_background.png" alt="">
                <img id="player" src="../media/player.png" alt="">
                <img id="waterBall" src="../media/waterBall.png" alt="">
                <audio id="jump" src="../media/wings.mp3"></audio>
                <audio id="charge" src="../media/charge.mp3"></audio>
            </div>
            
        <script> 
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 960;
    
    const game = new Game(canvas, ctx);

    let lastTime = 0;
    let animate = (timeStamp) => {
        const delta = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(delta);
        requestAnimationFrame(animate);
    }

    animate(0);
    canvas.scrollIntoView();</script>
            `
}

