(function() {

	var playerList = ["X","O"]
	var player = "O" // init
	var isWin = 0

	/**
	 * manage the change of player
	 * @param  {string} player actual player of the round
	 * @return {int}        index position of the playerList
	 */
	function changePlayer(player) {
		if(player === "X") {
			return 1
		}	else {
			return 0
		}
	}

	/**
	 * execute some stuff if the game is won
	 */
	function win() {
		if(!isWin){

			setTimeout(function(){
				window.location.reload(1)
			}, 2000)
			$("table").before("<div class='msg'>Player : " + player + " win :)</div>")
			isWin = 1

		}
	}
	/**
	 * execute some stuff if the game is won
	 */
	function draw() {
		if(!isWin){
			setTimeout(function(){
				window.location.reload(1)
			}, 2000)
			$("table").before("<div class='msg'>no player win, try again !</div>")
			isWin = 1
		}
	}

	/**
	 * check victory throught the rows
	 * @return {int} exit code
	 */
	function checkRows() {
		// check each row
		for (var i = 1; i <= 3; i++) {
			let  rows = $(".row_" + i)
			let childrens = rows.children()
			let square = []
			// check the values of each row
			for (var j = 0 ; j < 3 ; j++) {
				let children = childrens[j]
				square.push(children.getAttribute("player"))
			}
			// check win of the rows
			if(square[0] != null && square[1] != null && square[2] != null &&  square[0] == square[1] && square[1] == square[2]) {
				win()
				return 1
			}
		}
	}

	/**
	 * check victory throught the lines
	 * @return {int} exit code
	 */
	function checkLines() {
		// check each column
		for (var i = 1; i <= 3; i++) {
			let  colums = $(".col_" + i)
			// console.log(colums)
			let square = []
			//check the values of each column
			for (var j = 0 ; j < 3 ; j++) {
				let column = colums[j].getAttribute("player")
				square.push(column)
			}
			// check win of the colums
			if(square[0] != null && square[1] != null && square[2] != null &&  square[0] == square[1] && square[1] == square[2]) {
				win()
				return 1
			}
		}
	}

	/**
	 * check victory throught the diagonals
	 * @return {int} exit code
	 */
	function checkDiagonal(){
		let square = []
		for (var i = 1 ; i <= 2 ; i++) {
			let diagonals = $(".d_" + i)
			for (var j = 0 ; j < diagonals.length ; j++) {
				square.push(diagonals[j].getAttribute("player"))
			}
			if( square[0] != null && square[1] != null && square[2] != null && square[0] == square[1] && square[1] == square[2]) {
				win()
				return 1
			}
			// reset for the second diagonal
			square = []
		}
	}

	/**
	 * check the draw
	 * @return {int} exit code
	 */
	function checkDraw(){
		let square = []
		let allSquare = $(".draw")
		for (var i = 0 ; i < allSquare.length ; i++) {
			// push if X or O
			if(allSquare[i].getAttribute("player") != null) {
				square.push(allSquare[i].getAttribute("player"))
			}
			if(square.length == 9) {
				draw()
				return 1
			}
		}
	}

	// listener of event
	$(document).ready(function() {
		$("td").on( {
			mouseenter: function() {
					$(this).css("background-color", "lightgray")
			},
			mouseleave: function() {
					$(this).css("background-color", "white")
			},
			click: function() {
				// $(".msg").html("c")
				// check of player
				playerIndex = changePlayer(player)

				player = playerList[playerIndex]
				// if attribute 'player' doesn't exist -> set it with the player's value
				if(!$(this).attr("player")) {
					$(this).attr("player", player)
					$(this).html(player)
					// check victory
					checkRows()
					checkLines()
					checkDiagonal()
					checkDraw()

				}	else {
					playerIndex = changePlayer(player)
					player = playerList[playerIndex]
					$("table").before('<div class="msg">allready used</div>')
					setTimeout(function(){
					}, 2000)
					setTimeout(function(){
						$(".msg").remove()
					}, 2600)
					// alert("allready used fucking asshole !!!")
				}
			}
		})
	})
})()
