class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.baseHeight = 960;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.sound = new AudioControls();
        this.player = new Player(this);
        this.gravity;
        this.speed;
        this.minSpeed;
        this.maxSpeed;
        this.score;
        this.gameOver;
        this.timer;
        this.message1;
        this.message2;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX;
        this.swipeDistance = 50;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener("resize", (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        })

        window.addEventListener("mousedown", () => {
            this.player.jump();
        })

        window.addEventListener("mouseup", () => {
            this.player.wingsUp();
        })

        window.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "ArrowUp") {
                e.preventDefault();
                this.player.jump();
            }
            if (e.key === "Shift" || e.key === "ArrowRight") {
                this.player.startCharge();
            }
            if (e.key === ("r" || 'R')) {
                window.location.reload();
            }
        })

        window.addEventListener("keyup", () => {
            this.player.wingsUp();
        })

        this.canvas.addEventListener("touchstart", (e) => {
            this.player.jump();
            this.touchStartX = e.touches[0].pageX;
        })

        this.canvas.addEventListener("touchmove", (e) => {
            if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
                this.player.startCharge();
            }
        })
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.font = "15px Chewy";
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "white";
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.gravity = 0.15 * this.ratio;
        this.speed = 4 * this.ratio;
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 4;
        this.obstacles = [];
        this.numberOfObstacles = 50;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });

        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
    }

    render(delta) {
        if (!this.gameOver) {
            this.timer += delta;
        }
        this.handlePeriodicEvents(delta);
        this.background.update();
        this.background.draw();
        this.drawStatusText();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });
    }

    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }

    checkCollision(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadii;
    }

    formatTimer() {
        return (this.timer * 0.001).toFixed(1);
    }

    handlePeriodicEvents(delta) {
       if (this.eventTimer < this.eventInterval) {
           this.eventTimer += delta;
           this.eventUpdate = false;
       } else {
           this.eventTimer = this.eventTimer % this.eventInterval;
           this.eventUpdate = true;
       }
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.textAlign = "right";
        this.ctx.fillStyle = "white";
        this.ctx.fillText('Score : ' + this.score, this.width - 10, 30);
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "left";
        this.ctx.fillText('Timer : ' + this.formatTimer(), 10, 30);
        if (this.gameOver) {
            if (this.player.collided) {
                this.message1 = "You Loser";
                this.message2 = "";
            } else if (this.obstacles.length > 0) {
                this.message1 = "Game Over, Winnable";
                this.message2 = "";
            }

            this.ctx.textAlign = "center";
            this.ctx.font = "30px Chewy";
            this.ctx.fillText('Game Over: ', this.width * 0.5, this.height * 0.5 - 40);
            this.ctx.font = "15px Chewy";
            this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5 - 20);
            this.ctx.fillText('Press "R" to try again!', this.width * 0.5, this.height * 0.5);
        }

        if (this.player.energy <= this.player.minEnergy) {
            this.ctx.fillStyle = 'red';
        } else if (this.player.energy >= this.player.maxEnergy) {
            this.ctx.fillStyle = 'green';
        } else {
            this.ctx.fillStyle = 'blue';
        }

        for (let i = 0; i < this.player.energy; i++) {
            this.ctx.fillRect(10, this.height - 10 - this.player.chargeBar * i, this.player.chargeBar * 5, this.player.chargeBar);
        }
        this.ctx.restore();
    }
}





