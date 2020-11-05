const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;

let colorArray = ["#078EF5", "#08D5FF", "#13E8D3", "#08FFA0", "#07F557"];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("click", function () {
  if (canvas.style.backgroundColor === "black") {
    canvas.style.backgroundColor = "white";
  } else {
    canvas.style.backgroundColor = "black";
  }
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();
    };
    this.update = function () {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      if (
        mouse.x - this.x < 100 &&
        mouse.x - this.x > -100 &&
        mouse.y - this.y < 100 &&
        mouse.y - this.y > -100 &&
        this.radius < maxRadius
      ) {
        this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
  }
}

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 1200; i++) {
    let radius = Math.random() * 7 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();