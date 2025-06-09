// --- Rocket Simulator Script ---

// --- Rocket variables ---
let RocketMass = 1000; // in kg, example value
let RocketPower = 20000; // in Newtons, example value

// --- Physics variables ---
const AirFriction = 0.05; // Drag coefficient (example value)
let RocketVelocity = 0;   // m/s
let RocketAltitude = 0;   // m
let RocketFuel = 1000;    // kg, example value
let Gravity = 9.81;       // m/s^2

// --- Canvas/Grid variables ---
let canvas, ctx;
let gridDots = [];

// --- Website variables ---
let screen = "main";
const screenlist = ["main", "PlayScreen"];

const Debug = {
  show: function (text) {
    console.log(text);
  },
};

function ChangeScreen(changeTo) {
  if (screenlist.includes(changeTo)) {
    screen = changeTo;
  } else {
    Debug.show("--screen showed due to error--");
    console.log("invalid screen change");
  }
}

// --- DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("RocketCanvas");
  if (!canvas) {
    Debug.show("Error: Canvas with id 'RocketCanvas' not found.");
    return;
  }
  ctx = canvas.getContext("2d");

  generateGridDots();

  // Add play button listener
  const playBtn = document.getElementById("PlayButton");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      playBtn.style.display = "none";        // Hide the Play button
      canvas.style.display = "block";        // Show the canvas
      RocketSimLoop();
    });
  } else {
    Debug.show("Error: PlayButton not found.");
  }
});

// --- Simulation Loop ---
function RocketSimLoop() {
  updatePhysics();
  draw();

  requestAnimationFrame(RocketSimLoop);
}

// --- Physics Update ---
function updatePhysics() {
  if (RocketFuel > 0) {
    // Thrust minus gravity and air friction
    let thrustAccel = RocketPower / RocketMass;
    let drag = AirFriction * RocketVelocity;
    let netAccel = thrustAccel - Gravity - drag;

    RocketVelocity += netAccel * 0.016; // Assuming 60 FPS, dt ≈ 0.016s
    RocketAltitude += RocketVelocity * 0.016;

    // Burn fuel
    RocketFuel -= (RocketPower / 3000) * 0.016; // Arbitrary fuel burn rate
    if (RocketFuel < 0) RocketFuel = 0;
  } else {
    // No more fuel, just gravity and drag
    let drag = AirFriction * RocketVelocity;
    let netAccel = -Gravity - drag;

    RocketVelocity += netAccel * 0.016;
    RocketAltitude += RocketVelocity * 0.016;
  }

  if (RocketAltitude < 0) {
    RocketAltitude = 0;
    RocketVelocity = 0;
  }
}

// --- Grid ---
function generateGridDots() {
  gridDots = [];
  for (let x = 0; x < 800; x += 50) {
    for (let y = 0; y < 600; y += 50) {
      gridDots.push({ x, y });
    }
  }
}

function drawGrid() {
  ctx.fillStyle = "lightgrey";
  gridDots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// --- Drawing ---
function drawRocket() {
  // Simple rocket representation
  let rocketX = canvas.width / 2;
  // Flip altitude so "higher" goes up the screen
  let rocketY = canvas.height - RocketAltitude * 0.5; // scale altitude to pixels

  // Clamp rocketY to canvas
  if (rocketY < 40) rocketY = 40;
  if (rocketY > canvas.height - 40) rocketY = canvas.height - 40;

  ctx.fillStyle = "red";
  ctx.fillRect(rocketX - 10, rocketY - 40, 20, 40);
  ctx.fillStyle = "#222";
  ctx.fillRect(rocketX - 6, rocketY - 50, 12, 10);

  // Optional: Draw flame if rocket is thrusting
  if (RocketFuel > 0) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(rocketX - 6, rocketY);
    ctx.lineTo(rocketX + 6, rocketY);
    ctx.lineTo(rocketX, rocketY + 20 + Math.random()*10);
    ctx.closePath();
    ctx.fill();
  }
}

function drawHUD() {
  ctx.fillStyle = "#000";
  ctx.font = "16px monospace";
  ctx.fillText(`Altitude: ${RocketAltitude.toFixed(2)} m`, 10, 20);
  ctx.fillText(`Velocity: ${RocketVelocity.toFixed(2)} m/s`, 10, 40);
  ctx.fillText(`Fuel: ${RocketFuel.toFixed(1)} kg`, 10, 60);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawRocket();
  drawHUD();
}
