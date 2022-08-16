<template>
  <v-container class="main-card">
    <v-btn variant="outlined" color="primary" @click="back()">
      <v-icon icon="mdi-arrow-left"/>
      {{ $t("snake.return") }}
    </v-btn>
  </v-container>

  <v-card class="main-card" elevation="10">
    <canvas ref="board" width="670" height="600" style="display: block; margin: auto;" />
  </v-card>
  <v-card class="main-card" elevation="10">
    <v-card-title>
      <v-icon icon="mdi-gamepad" color="primary" size="small"></v-icon>
      {{ $t("snake.instructions") }}
    </v-card-title>
    <v-card-text>
        <v-row style="margin-top: 10px">
            <v-col xs="12" md="6" >
                <p>
                    <v-icon icon="mdi-alpha-w" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-a" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-s" color="warning" size="large" />
                    <v-icon icon="mdi-alpha-d" color="warning" size="large" />
                    {{ $t("snake.move") }}
                </p>
            </v-col>
            <v-col xs="12" md="6" >
                <p>
                    <v-icon icon="mdi-alpha-i" color="warning" size="large" />
                    {{ $t("snake.reset") }}
                </p>
            </v-col>
        </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum GameStates {
  GAME_IDLE = "GAME_IDLE",
  GAME_COUNTDOWN = "GAME_COUNTDOWN",
  GAME_START = "GAME_START",
  GAME_ON = "GAME_ON",
  GAME_OVER = "GAME_OVER",
}

enum PlayerStates {
  PLAYER_ALIVE = "PLAYER_ALIVE",
  PLAYER_DEAD = "PLAYER_DEAD",
}

export default defineComponent({
  name: "GameCanvas",
  data() {
    return {
      interval: 1000 / 60, //Max 60fps
      lastTime: performance.now(),
      currentTime: 0,
      delta: 0,
      times: [],
      fps: 0,
      paused: false,
      network: null,

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


      id: null,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      score: 0,
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

        this.debugInfo();
        this.drawSnake();
        this.drawPowerUps();
        this.movement();
        this.checkCollision();

        this.lastTime = this.currentTime - (this.delta % this.interval);
      }
    },
    debugInfo() {
      this.ctx.font = "14px Calibri";
      this.ctx.fillStyle = "#000";
      this.ctx.fillText("FPS: " + this.fps, 10, 20);
      this.ctx.fillText("x: " + this.x, 10, 40);
      this.ctx.fillText("y: " + this.y, 10, 60);
      this.ctx.fillText("dx: " + this.dx, 10, 80);
      this.ctx.fillText("dy: " + this.dy, 10, 100);
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

      /*if (this.snakeBody.length > 500) {
        this.snakeBody.pop();
      }*/
      
      if(this.network) {
        this.network.sendPosition(this.snakeBody);
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
      if (this.powerup) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.powerup.color;
        this.ctx.fillRect(this.powerup.x, this.powerup.y, this.powerup.radius, this.powerup.radius);
        this.ctx.closePath();
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
        case "p":
          if (this.paused) {
            this.unpause();
          } else {
            this.gameOver();
          }
          break;
        case "i":
          this.reset();
          break;
        default:
          break;
      }
    },
    keyUpHandler(e) {
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
        default:
          break;
      }
    },
    onGameStateUpdate(state) {
      if(state == GameStates.GAME_START) {
        this.dx = 5;
        this.dy = 0;
        this.velocity = 5;
        this.velocityMultiplier = 1;
      }
    },
    onPlayerStateUpdate(state) {
      
    },
    spawnPowerUp(data) {
      this.powerup = data;
    },
    pickPowerUp() {
      this.network?.pickPowerUp(this.powerup);
    },
    removePowerUp() {
      this.powerup = null;
    },
    startPowerUpEffect(data: any) {
      this.velocityMultiplier = 10;
    },
    stopPowerUpEffect() {
     this.velocityMultiplier = 5;
    },
    gameOver() {
      this.network?.updatePlayerState(PlayerStates.PLAYER_DEAD);
      this.paused = true;
    },
    unpause() {
      this.paused = false;
    },
    reset() {
      this.paused = false;
      this.snakeBody = [];
      this.dx = 5;
      this.dy = 0;
      this.velocity = 5;
      this.velocityMultiplier = 1;

      this.x = this.canvas.width / 2;
      this.y = this.canvas.height / 2;
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

    this.reset();
    this.draw();
  },
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
