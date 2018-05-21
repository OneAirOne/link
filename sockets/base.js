const fs = require('fs');
// var hightScore = {hightScore:5};
var hightScore;
var connectCounter = 0;
var srcFile = "hightScore.json"

// high score load
fs.readFile(`./${srcFile}`,'utf8', (err, data) => {
	hightScore = JSON.parse(data);
})


module.exports = function (io) {
	console.log(`${connectCounter} user(s) connected`)
	io.on('connection', function (socket) {

		// count users connected
		connectCounter++;
		console.log("new user connected")
		console.log(`${connectCounter} user(s) connected`)

		// emit response on client connexion
	  socket.emit('news', hightScore );

		// boadcast clients responses
	  socket.on('newsResponse', function (data) {
			socket.emit('news', { hightScore: data['newHightScore'], nbUser: connectCounter});
			socket.broadcast.emit('news', { hightScore: data['newHightScore'], nbUser: connectCounter});
			hightScore['hightScore'] = data['newHightScore'];
  	});

		// substract user when disconneted
		socket.on("disconnect", () => {
    	connectCounter--;
			console.log("one user disconnected");
  	});
	});

	/**
	 * save hightScore
	 * @return {void}
	 */
	function save() {
		console.log('save proc');
		try {
			fs.readFile(`./${srcFile}`,'utf8', (err, data) => {
				if (err) throw err;

				var json = JSON.parse(data)

				if (json['hightScore'] < hightScore || json['hightScore'] != undefined) {

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
