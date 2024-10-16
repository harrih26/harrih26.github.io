<template>
  <v-card class="main-card" elevation="10">
    <canvas ref="board" width="670" height="600" style="display: block; margin: auto;" />
    <!-- Add welcome screen overlay -->
    <div v-if="showWelcomeScreen" class="overlay-screen welcome-screen">
      <h2>{{ $t("snake.welcome") }}</h2>
      <p>{{ $t("snake.pressToStart") }}</p>
    </div>
    <!-- Add game over screen overlay -->
    <div v-if="showGameOverScreen" class="overlay-screen game-over-screen">
      <h2>{{ $t("snake.gameOver") }}</h2>
      <p>{{ $t("snake.finalScore", { score: score }) }}</p>
      <p>{{ $t("snake.pressToRestart") }}</p>
    </div>
  </v-card>
  <v-card class="main-card" elevation="10">
    <v-card-title>
      <v-icon icon="mdi-gamepad" color="primary" size="small"></v-icon>
      {{ $t("snake.instructions") }}
    </v-card-title>
    <v-card-text>
        <v-row style="margin-top: 10px">
            <v-col xs="12">
                <p>
                    <v-icon icon="mdi-alpha-w" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-a" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-s" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-d" color="warning" size="large" />
                    {{ $t("snake.move") }}
                </p>
            </v-col>
        </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const colors = ["red", "lightred", "green", "lightgreen", "blue", "lightblue", "orange", "purple", "pink", "brown", "black"];

export default defineComponent({
  name: "GameCanvas",
  data() {
    return {
      interval: 1000 / 60,
      lastTime: performance.now(),
      currentTime: 0,
      delta: 0,
      times: [],
      fps: 0,
      paused: false,

      leftPressed: false,
      rightPressed: false,
      upPressed: false,
      downPressed: false,

      backgroundColor: "gray",
      snakeBody: [],
      otherPlayers: [],
      powerup: null,

      x: 0,
      y: 0,
      radius: 10,
      dx: 0,
      dy: 0,
      velocity: 0,
      velocityMultiplier: 1,
      spawnSafeArea: 5,

      id: null,
      color: "red",
      score: 0,
      showWelcomeScreen: true,
      showGameOverScreen: false,
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    draw() {
      window.requestAnimationFrame(this.draw);

      this.currentTime = performance.now();
      this.delta = this.currentTime - this.lastTime;

      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length;

      if (this.canvas && this.delta > this.interval) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#e8e8e8";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.showWelcomeScreen && !this.showGameOverScreen) {
          this.debugInfo();
          this.drawSnake();
          this.drawPowerUps();
          this.movement();
          this.checkCollision();
        }

        this.lastTime = this.currentTime - (this.delta % this.interval);
      }
    },
    debugInfo() {
      this.ctx.font = "18px Calibri";
      this.ctx.fillStyle = "#000";
      this.ctx.fillText("POINTS: " + this.score, 10, 20);

      this.ctx.font = "14px Calibri";
      this.ctx.fillStyle = "#000";
      /*this.ctx.fillText("FPS: " + this.fps, 10, 40);
      this.ctx.fillText("x: " + this.x, 10, 60);
      this.ctx.fillText("y: " + this.y, 10, 80);
      this.ctx.fillText("dx: " + this.dx, 10, 100);
      this.ctx.fillText("dy: " + this.dy, 10, 120);*/
    },
    drawSnake() {
      if (!this.paused) {
        this.x += this.dx;
        this.y += this.dy;
      }

      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = "#000";
      this.ctx.fillRect(this.x, this.y, this.radius, this.radius);

      this.ctx.closePath();

      for (let i = 1; i < this.snakeBody.length; i++) {
        this.ctx.fillRect(
          this.snakeBody[i].x,
          this.snakeBody[i].y,
          this.snakeBody[i].radius,
          this.snakeBody[i].radius
        );
      }

      this.ctx.closePath();

      if (!this.snakeBody.find(({ x, y }) => x == this.x && y == this.y)) {
        this.snakeBody.unshift({
          x: this.x,
          y: this.y,
          radius: this.radius,
          color: this.color,
        });
      }

      if (this.snakeBody.length > (this.score + 1) * 50) {
        this.snakeBody.pop();
      }
      
      for (let p = 0; p < this.otherPlayers.length; p++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.otherPlayers[p].color;

        if(this.otherPlayers[p].snakeBody) {
          for (let i = 0; i < this.otherPlayers[p].snakeBody.length; i++) {
            this.ctx.fillRect(
              this.otherPlayers[p].snakeBody[i].x,
              this.otherPlayers[p].snakeBody[i].y,
              this.otherPlayers[p].snakeBody[i].radius,
              this.otherPlayers[p].snakeBody[i].radius
            );
          }
        }
        this.ctx.closePath();
      }
    },
    drawPowerUps() {
      if (!this.paused) {
        if (!this.powerup) {
          this.powerup = {
            x: Math.floor(Math.random() * (this.canvas.width - this.spawnSafeArea)),
            y: Math.floor(Math.random() * (this.canvas.height - this.spawnSafeArea)),
            radius: 10,
            color: "green"
          };
        }

        if (this.powerup) {
          this.ctx.beginPath();
          this.ctx.fillStyle = this.powerup.color;
          this.ctx.fillRect(this.powerup.x, this.powerup.y, this.powerup.radius, this.powerup.radius);
          this.ctx.closePath();
        }
      }
    },
    movement() {
      const goingUp = this.dy === -this.velocity * this.velocityMultiplier;
      const goingDown = this.dy === this.velocity * this.velocityMultiplier;
      const goingRight = this.dx === this.velocity * this.velocityMultiplier;
      const goingLeft = this.dx === -this.velocity * this.velocityMultiplier;

      if (this.rightPressed && !goingLeft) {
        this.dx = this.velocity * this.velocityMultiplier;
        this.dy = 0;
      }

      if (this.leftPressed && !goingRight) {
        this.dx = -this.velocity * this.velocityMultiplier;
        this.dy = 0;
      }

      if (this.upPressed && !goingDown) {
        this.dx = 0;
        this.dy = -this.velocity * this.velocityMultiplier;
      }

      if (this.downPressed && !goingUp) {
        this.dx = 0;
        this.dy = this.velocity * this.velocityMultiplier;
      }
    },
    checkCollision() {
      if (this.dy !== 0 || this.dx !== 0) {

        if (this.powerup && this.isColliding(this.powerup.x, this.powerup.y, this.powerup.radius)) {
          this.powerup = null;
          this.pickPowerUp();
        } 

        //Collision with tail
        for (let i = this.snakeBody.length - 1; i > 20; i--) {
          const isColliding = this.isColliding(this.snakeBody[i].x, this.snakeBody[i].y, this.snakeBody[i].radius)
          if (isColliding) {
            this.gameOver();
          }
        }

        if (this.x + this.radius > this.canvas.width) {
          this.gameOver();
        }

        if (this.x + this.radius <= 0) {
          this.gameOver();
        }

        if (this.y + this.radius <= 0) {
          this.gameOver();
        }

        if (this.y + this.radius > this.canvas.height) {
          this.gameOver();
        }
      }
    },
    isColliding(x: number, y: number, radius: number) {
      const headXRight = this.x + this.radius;
      const checkXRight = x + radius;
      const headYBottom = this.y + this.radius;
      const checkYBottom = y + radius;

      const overlapX = (this.x <= checkXRight && this.x >= x) || 
        (headXRight <= checkXRight && headXRight >= x);
      const overlapY = (this.y <= checkYBottom && this.y >= y) || 
        (headYBottom <= checkYBottom && headYBottom >= y);
      return overlapX && overlapY;
    },
    keyDownHandler(e: KeyboardEvent) {
      if (this.showWelcomeScreen || this.showGameOverScreen) {
        this.startGame()
        return
      }

      switch (e.key) {
        case "d":
          this.rightPressed = true;
          break;
        case "a":
          this.leftPressed = true;
          break;
        case "w":
          this.upPressed = true;
          break;
        case "s":
          this.downPressed = true;
          break;
        case "ArrowRight":
          this.rightPressed = true;
          break;
        case "ArrowLeft":
          this.leftPressed = true;
          break;
        case "ArrowUp":
          this.upPressed = true;
          break;
        case "ArrowDown":
          this.downPressed = true;
          break;
        case "p":
          if (this.paused) {
            this.unpause();
          } else {
            this.pause();
          }
          break;
        case "i":
          this.reset();
          break;
        default:
          break;
      }
    },
    keyUpHandler(e: KeyboardEvent) {
      switch (e.key) {
        case "d":
          this.rightPressed = false;
          break;
        case "a":
          this.leftPressed = false;
          break;
        case "w":
          this.upPressed = false;
          break;
        case "s":
          this.downPressed = false;
          break;
        case "ArrowRight":
          this.rightPressed = false;
          break;
        case "ArrowLeft":
          this.leftPressed = false;
          break;
        case "ArrowUp":
          this.upPressed = false;
          break;
        case "ArrowDown":
          this.downPressed = false;
          break;
        default:
          break;
      }
    },
    onGameStateUpdate() {
      if(!this.paused) {
        this.dx = 5;
        this.dy = 0;
        this.velocity = 5;
        this.velocityMultiplier = 1;
      }
    },
    onPlayerStateUpdate() {
      
    },
    pickPowerUp() {
      this.score++;
      this.powerup = null;
    },
    startPowerUpEffect(data: any) {
      this.velocityMultiplier = 10;
    },
    stopPowerUpEffect() {
     this.velocityMultiplier = 5;
    },
    gameOver() {
      this.paused = true;
      this.showGameOverScreen = true;
    },
    unpause() {
      this.paused = false;
    },
    reset() {
      this.showWelcomeScreen = false;
      this.showGameOverScreen = false;
      this.paused = false;
      this.powerup = null;
      this.snakeBody = [];
      this.color = colors[Math.floor(Math.random() * colors.length)]
      this.dx = 5;
      this.dy = 0;
      this.velocity = 5;
      this.velocityMultiplier = 1;
      this.score = 0;

      this.x = this.canvas.width / 2;
      this.y = this.canvas.height / 2;
    },
    startGame() {
      this.showWelcomeScreen = false;
      this.showGameOverScreen = false;
      this.reset();
      this.unpause();
    },
    pause() {
      this.paused = true;
    },
  },
  computed: {
    ctx() {
      return this.canvas.getContext("2d") as any;
    },
    canvas() {
      return this.$refs["board"] as any;
    },
  },
  beforeMount() {

  },
  mounted() {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    const vendors = ["webkit", "moz"];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      //@ts-ignore
      window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      //@ts-ignore
      window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    this.draw();
  },
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  border-radius: 5px;
}

.welcome-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  color: #000;
}

.overlay-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  color: #000;
}

.game-over-screen {
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
}
</style>
