// rocket variables
let RocketMass = 0;
let RocketPower = 0;

// Simulator variables
const AirFriction = 0.05;

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
