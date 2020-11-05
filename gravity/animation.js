const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ballArray = [];
let colors = [
  "#92B02A",
  "#CFFC30",
  "#FC23A9",
  "#07B05B",
  "#17FC8A",
  "#56FEC0",
  "#4EE683",
  "#62FC6D",
  "#76E64E",
  "#BDFE56"
];

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

window.addEventListener("click", function () {
  if (canvas.style.backgroundColor === "black") {
    canvas.style.backgroundColor = "white";
  } else {
    canvas.style.backgroundColor = "black";
  }
  init();
});

class Ball {
  constructor(x, y, dx, dy, radius, gravity, friction, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.gravity = gravity;
    this.friction = friction;
    this.color = color;

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };

    this.update = function () {
      if (this.y + this.radius + this.dy > innerHeight) {
        this.dy = -this.dy * this.friction;
      } else {
        this.dy += this.gravity;
      }

      if (
        this.x + this.radius + this.dx > innerWidth ||
        this.x - this.radius + this.dx < 0
      ) {
        this.dx = -this.dx * this.friction;
      }

      this.y += this.dy;
      this.x += this.dx;
      this.draw();
    };
  }
}

function init() {
  ballArray = [];
  for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 40 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let dy = Math.random() * 5 + 1;
    let gravity = 1;
    let friction = Math.random();
    let color = colors[Math.floor(Math.random() * colors.length)];
    ballArray.push(new Ball(x, y, dx, dy, radius, gravity, friction, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
