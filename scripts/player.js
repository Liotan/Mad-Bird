class Player {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width;
        this.height;
        this.speedY;
        this.jumpSpeed;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.collided;
        this.energy = 30;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;
        this.charging;
        this.chargeBar;
        this.image = document.getElementById("player");
        this.frameX;
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update() {
        this.handleEnergy();

        if (this.speedY >= 0 && !this.charging) {
            this.wingsUp();
        }
        this.y += this.speedY;
        this.collisionY = this.y + this.height * 0.5;
        if (!this.charging) {
            this.speedY += this.game.gravity;
        } else {
            this.speedY = 0;
        }

        if (this.isTouchingBottom()) {
            this.game.gameOver = true;
        }
    }

    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -4 * this.game.ratio;
        this.jumpSpeed = 5 * this.game.ratio;
        this.collisionRadius = 45 * this.game.ratio;
        this.collisionX = this.x + this.width * 0.4;
        this.collided = false;
        this.chargeBar = Math.floor(5 * this.game.ratio);
        this.wingsIdle();
        this.charging = false;
    }

    startCharge() {
        if (this.energy >= this.minEnergy && !this.charging) {
            this.charging = true;
            this.game.speed = this.game.maxSpeed;
            this.wingsCharge();
            this.game.sound.play(this.game.sound.charge);
        } else {
            this.stopCharge()
        }
    }

    stopCharge() {
        this.charging = false;
        this.game.speed = this.game.minSpeed;
    }

    wingsIdle() {
        this.frameX = 1;
    }

    wingsCharge() {
        this.frameX = 0;
    }

    wingsDown() {
        this.frameX = 2;
    }

    wingsUp() {
        this.frameX = 3;
    }

    isTouchingTop() {
        return this.y <= 0;
    }

    isTouchingBottom() {
        return this.y >= this.game.height + 150 - this.height;
    }

    handleEnergy() {
        if (this.game.eventUpdate) {
            if (this.energy < this.maxEnergy) {
                this.energy += 1;
            }

            if (this.charging) {
                this.energy -= 5;
                if (this.energy <= 0) {
                    this.energy = 0;
                    this.stopCharge();
                }
            }
        }
    }

    jump() {
        this.stopCharge();
        if (!this.isTouchingTop()) {
            this.speedY = -this.jumpSpeed;
            this.game.sound.play(this.game.sound.jump);
            this.wingsDown();
        }
    }
}