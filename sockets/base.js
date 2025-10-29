const fs = require("fs");
// var highscore;
let connectCounter = 0;
let srcFile = "highscore.json";

// high score load

module.exports = function (io) {
  let highscore;
  try {
    const data = fs.readFileSync(`./${srcFile}`, "utf8");
    highscore = JSON.parse(data);
  } catch (err) {
    console.error("Error reading highscore file:", err);
    return; // Do not proceed if highscore file cannot be read
  }

  io.on("connection", function (socket) {
    console.log("connection", socket.id);
    console.log("connection highscore", highscore);
    // count users connected
    connectCounter++;
    // console.log(`${connectCounter} user(s) connected`)

    // emit response on client connexion
    if (highscore) {
      console.log("should emit highscore ", highscore);
      socket.emit("news", {
        highscore: highscore["highscore"],
        playerName: highscore["playerName"],
        nbUser: connectCounter,
      });
      socket.broadcast.emit("news", {
        highscore: highscore["highscore"],
        playerName: highscore["playerName"],
        nbUser: connectCounter,
      });

      // boadcast clients responses
      socket.on("newsResponse", function (data) {
        socket.emit("news", {
          highscore: data["newhighscore"],
          playerName: data["playerName"],
          nbUser: connectCounter,
          publish: "new",
        });

        socket.broadcast.emit("news", {
          highscore: data["newhighscore"],
          playerName: data["playerName"],
          nbUser: connectCounter,
          publish: "new",
        });
        // server save on cash
        highscore["highscore"] = data["newhighscore"];
        highscore["playerName"] = data["playerName"];
      });

      // substract user when disconneted
      socket.on("disconnect", () => {
        connectCounter--;
        socket.broadcast.emit("news", {
          highscore: highscore["highscore"],
          playerName: highscore["playerName"],
          nbUser: connectCounter,
        });
      });
    }
  });

  /**
   * save highScore
   * @return {void}
   */
  function save() {
    try {
      var toSave = JSON.stringify(highscore);
      fs.writeFile(`./${srcFile}`, toSave, (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  // save highscore every minutes
  setInterval(function () {
    save();
  }, 60000);
};
