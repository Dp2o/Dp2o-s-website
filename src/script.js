// rocket variables
let RocketMass = 0;
let RocketPower = 0;

// Simulator variables
const AirFriction = 0.05;
const GridSpace = {
  
  
// website variables
let screen = "main";
let screenlist = ["main", "PlayScreen"];

const Debug = {
  show: function(text) {
    console.log(text);
  },
}

function ChangeScreen(ChangeScreen) {
  if (screenlist.includes(ChangeScreen)) {
    screen = ChangeScreen;
  } else {
    Debug.show("--screen showed due to error--");
    console.log("invalid screen change");
  }
}

function SimLoop() {
  
  requestAnimationFrame(SimLoop);
}

function moveGridDotsWithKeys() {
  // Move grid dots
  gridDots.forEach((dot) => {
    dot.x -= AccelerationX;
    dot.y -= AccelerationY;

    // Wrap around the canvas boundaries
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.x < 0) dot.x = canvas.width;
    if (dot.y > canvas.height) dot.y = 0;
    if (dot.y < 0) dot.y = canvas.height;
  });

  // Move enemies along with the map to make it look like the player is moving
  enemies.forEach((enemy) => {
    enemy.y -= AccelerationY; // Move down
    enemy.x -= AccelerationX; // Move right
  });
}
