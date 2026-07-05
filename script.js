const fields = [
  "Kinga",
  "1 öl",
  "Vajba",
  "2 drinkar",
  "Knekta",
  "4 öl",
  "Snusdags",
  "1 flaska vin",
  "2 öl",
  "Körkan",
  "5 öl",
  "1 drink",
  "3 öl",
];

const colors = [
  "#ff2a8d",
  "#00d7ff",
  "#ffdf2f",
  "#6bff6e",
  "#8b3dff",
  "#ff6b1a",
  "#00a86b",
  "#ff3d3d",
  "#2d57ff",
  "#ff7be7",
  "#14e5c6",
  "#ffe66b",
  "#b900ff",
];

const wheel = document.querySelector("#wheel");
const wheelFace = document.querySelector("#wheelFace");
const labelLayer = document.querySelector("#labelLayer");
const spinButton = document.querySelector("#spinButton");
const result = document.querySelector("#result");

const segment = 360 / fields.length;
let rotation = 0;
let spinning = false;

function buildWheel() {
  const slices = fields
    .map((_, index) => {
      const start = index * segment;
      const end = (index + 1) * segment;
      return `${colors[index]} ${start}deg ${end}deg`;
    })
    .join(", ");

  wheelFace.style.background = `conic-gradient(from -90deg, ${slices})`;

  fields.forEach((field, index) => {
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = field;
    label.style.transform = `rotate(${index * segment + segment / 2 - 90}deg)`;
    labelLayer.append(label);
  });
}

function positiveModulo(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

function spin() {
  if (spinning) return;

  spinning = true;
  spinButton.disabled = true;
  result.textContent = "Snurrar...";

  const winnerIndex = Math.floor(Math.random() * fields.length);
  const winningCenter = winnerIndex * segment + segment / 2;
  const current = positiveModulo(rotation, 360);
  const target = positiveModulo(360 - winningCenter, 360);
  let delta = target - current;

  if (delta < 0) delta += 360;

  const fullTurns = 6 + Math.floor(Math.random() * 3);
  rotation += fullTurns * 360 + delta;
  wheel.style.setProperty("--rotation", `${rotation}deg`);

  window.setTimeout(() => {
    spinning = false;
    spinButton.disabled = false;
    result.textContent = `Resultat: ${fields[winnerIndex]}`;
  }, 5300);
}

buildWheel();
spinButton.addEventListener("click", spin);
