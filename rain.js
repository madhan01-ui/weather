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
    y: 0,
    length: Math.random() * 15 + 10,
    speed: Math.random() * 5 + 2,
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
  });

  rainDrops = rainDrops.map((drop) => ({
    ...drop,
    y: drop.y + drop.speed,
  })).filter((drop) => drop.y < canvas.height);

  while (rainDrops.length < 100) {
    rainDrops.push(createRainDrop());
  }

  animation = requestAnimationFrame(drawRain);
}

function startRain() {
  if (!animation) drawRain();
}

function stopRain() {
  cancelAnimationFrame(animation);
  animation = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
