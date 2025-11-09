let rainDrops = [];
let animation;

const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createRainDrop() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 6 + 3,
    opacity: Math.random() * 0.4 + 0.2,
  };
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(174,194,224,0.5)";
  ctx.lineWidth = 2;

  rainDrops.forEach((drop) => {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.stroke();
    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.y = -20;
      drop.x = Math.random() * canvas.width;
    }
  });

  animation = requestAnimationFrame(drawRain);
}

function startRain() {
  if (!animation) {
    rainDrops = Array(120).fill().map(createRainDrop);
    drawRain();
  }
}

function stopRain() {
  cancelAnimationFrame(animation);
  animation = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
