const canvas = document.querySelector("#drawingCanvas");
const clearBtn = document.querySelector("#clearBtn");
const col1 = document.querySelector("#col-1");

const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
const colorArr = [
  "rgb(220,38,38)",
  "rgb(252,211,77)",
  "rgb(5,150,105)",
  "rgb(29,78,216)",
  "rgb(0,0,0)",
];
let color = 4;

window.addEventListener("load", init);
function init() {
  document.addEventListener("mousedown", start);
  document.addEventListener("mouseup", stop);
  clearBtn.addEventListener("click", clearCanvas);
  getPalette();
}

function getPalette() {
  const colors = [];
  for (let i = 1; i < 6; i++) {
    colors.push(document.querySelector(`#col-${i}`));
  }
  colors.map((col) => {
    col.addEventListener("click", (evt) => {
      color = colorArr[evt.target.id.slice(4, 5) - 1];
    });
  });
}
function start(evt) {
  document.addEventListener("mousemove", draw);
  reposition(evt);
}

function stop() {
  document.removeEventListener("mousemove", draw);
}

function reposition(evt) {
  coord.x = evt.clientX - canvas.offsetLeft;
  coord.y = evt.clientY - canvas.offsetTop;
}
function draw(evt) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(coord.x, coord.y);

  reposition(evt);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
