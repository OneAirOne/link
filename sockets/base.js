const fs = require('fs');
var hightScore;
var connectCounter = 0;
var srcFile = "hightScore.json"
var playerName;

// high score load
fs.readFile(`./${srcFile}`,'utf8', (err, data) => {
	hightScore = JSON.parse(data);
})

module.exports = function (io) {
	io.on('connection', function (socket) {

		// count users connected
		connectCounter++;
		console.log(`${connectCounter} user(s) connected`)

		// emit response on client connexion
		socket.emit('news', {
			hightScore: hightScore["hightScore"],
			playerName: hightScore["playerName"],
			nbUser: connectCounter
		});
		socket.broadcast.emit('news', {
			hightScore: hightScore['hightScore'],
			playerName: hightScore['playerName'],
			nbUser: connectCounter
		});

		// boadcast clients responses
	  socket.on('newsResponse', function (data) {
			socket.emit('news', {
					hightScore: data['newHightScore'],
					playerName: data['playerName'],
					nbUser: connectCounter,
					publish: "new"
				 });
			socket.broadcast.emit('news', {
				hightScore: data['newHightScore'],
				playerName: data['playerName'],
				nbUser: connectCounter,
				publish: "new"
			});
			// server save on cash
			hightScore['hightScore'] = data['newHightScore'];
			hightScore['playerName'] = data['playerName'];
  	});

		// substract user when disconneted
		socket.on("disconnect", () => {
    	connectCounter--;
			socket.broadcast.emit('news', {
				hightScore: hightScore['hightScore'],
				playerName: hightScore['playerName'],
				nbUser: connectCounter
			});
  	});
	});

	/**
	 * save highScore
	 * @return {void}
	 */
	function save() {
		try {
			fs.readFile(`./${srcFile}`,'utf8', (err, data) => {
				if (err) throw err;

				var json = JSON.parse(data)

				if (json['hightScore'] < hightScore['hightScore'] || json['hightScore'] != undefined) {

					var toSave = JSON.stringify(hightScore)

					fs.writeFile(`./${srcFile}`, toSave, (err) => {
					  if (err) throw err;
					  console.log('The file has been saved!');
					});
				}
			});
		} catch (err) {
			console.error(err.message);
		}
	}

	// save hightScore every minutes
	setInterval (function() {
		save();
	}, 60000);
}
