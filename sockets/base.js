const fs = require("fs");
// var highscore;
let connectCounter = 0;
let srcFile = "highscore.json";

// high score load
// fs.readFileSync(`./${srcFile}`, "utf8", (err, data) => {
//   console.log("readfile", data);
//   if (err) console.error("errrrrrro ", err);
//   highscore = JSON.parse(data);
// });

module.exports = function (io) {
  let highscore;
  fs.readFile(`./${srcFile}`, "utf8", (err, data) => {
    console.log("readfile", data);
    if (err) console.error("readFileerror ", err);
    highscore = JSON.parse(data);
  });

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
      fs.readFile(`./${srcFile}`, "utf8", (err, data) => {
        if (err) throw err;
        var json = JSON.parse(data);
        var toSave = JSON.stringify(highscore);
        fs.writeFile(`./${srcFile}`, toSave, (err) => {
          if (err) throw err;
          // console.log('The file has been saved!');
        });
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
