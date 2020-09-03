const io = require("socket.io-client");
const blinkstick = require("blinkstick");
const player = require("play-sound")();

const device = blinkstick.findFirst();

//const socket = io("https://blinkstick-server.glitch.me/");
const socket = io("https://blinkstick-server.herokuapp.com/");
//const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log("Connected to server.");
  device.pulse("#00FF00");

  /*player.play("./media/roadrunner.mp3", (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });*/
});

socket.on("disconnect", () => {
  console.log("Disconnected from server.");
  device.turnOff();
});

socket.on("color", ({ hex, op }) => {
  console.log(`Color: #${hex}`);
  if (op === "pulse") {
    device.pulse(`#${hex}`);
  } else {
    device.setColor(`#${hex}`);
  }
});

socket.on("alert", (data) => {
  console.log(data);
  device.morph("red", function () {
    device.morph("orange", function () {
      device.morph("yellow", function () {
        device.morph("green", function () {
          device.morph("blue", function () {
            device.morph("purple", function () {
              device.morph("#000000");
            });
          });
        });
      });
    });
  });
  player.play("./media/youve-got-mail.mp3", (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });
});

process.on("SIGINT", () => {
  device.turnOff();
  process.exit();
});

/*
rainbow morph
*/
/*
device.morph("red", function () {
    device.morph("orange", function () {
      device.morph("yellow", function () {
        device.morph("green", function () {
          device.morph("blue", function () {
            device.morph("purple", function () {
              device.morph("#000000");
            });
          });
        });
      });
    });
  });
  */
