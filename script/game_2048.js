(function($)
{
	$.fn.game2048 = function()
	{

		/**
		* display message befor a select tag
		* @param  {string} tag target tag where would spawn the message
		* @param  {[type]} msg message
		*/
		function displayMessageBefore(tag, msg)
		{
			$(tag).after('<div class="msg" style= "font-family: \'Courier New\', Courier, monospace;">' + msg +'</div>')
			setTimeout(function()
			{
				$(".msg").animate({"margin-left": "-200px"})
				$(".msg").animate({"margin-left": "1000px"})
			}, 3000)
			setTimeout(function()
			{
				$(".msg").remove()
			}, 3605)
		}



		/**
		* display the grid
		* @param  {int} param side size of the grid
		*/
		function drawGrid(param)
		{
			$("#scene").remove();
			$("#divInit").after("<div id=\"scene\"></div>");
			$("#scene").after("<div id=\"gameOver\"></div>");
			var id = 1;
			var posX = 0;
			var posY = 0;

			for (var y = 0 ; y < param ; y++) {

				for (var x = 0 ; x < param ; x++) {

					$("#scene").last().append("<div class= 'gridGame' x= " + x + " y= " + y + " empty= 'true'></div>")
					var square = $("[x='" + x + "'][y='" + y + "']");
					// creation of attribute with the pixel position on the window
					square.attr("posX", square.position().left);
					square.attr("posY", square.position().top);
				}
				x = 0;
			}
		}



		/**
		* return the number 2 or the number 4
		* 2 have 2/3 of chance to be generate
		* @return {int} random number
		*/
		function generateNumber()
		{
			var numberRand = (Math.random() * 10)

			if (numberRand < 3) {
				var number = 4;
			} else {
				var number = 2;
			}
			return number;
		}



		/**
		* generate random tile with random number
		* @param  {int} randomNbr 2 or 4 -> generate by generateNumber function
		*/
		function generateTile(randomNbr)
		{
			var emptyElement =  $(".gridGame[empty = 'true']");
			var randomIndex = Math.random() * emptyElement.length;
			var element = $(emptyElement[parseInt(randomIndex)]);
			var posX = element.attr("posX");
			var posY = element.attr("posY");
			var x = element.attr("x");
			var y = element.attr("y");
			var grid = $("[x='" + x + "'][y='" + y + "']");

			$("#scene").append("<div class='element' x =" + x + " y=" + y + " </div>");

			var square = $("[class=element][x='" + x + "'][y='" + y + "']");
			square.removeAttr( "style" ).hide().fadeIn(200)

			// assignation of the value of the grid
			square.css({top: parseFloat(posY), left: parseFloat(posX)});
			square.attr("color", randomNbr.toString())
			square.html(randomNbr);

			// update the grid
			grid.attr("empty", false);
		}


		/**
		* init of the game
		* @param  {int} gridSize the size of the grid to determinate the number of init spawn
		*/
		function init(gridSize)
		{
			var init = 2;
			var initGridSize = gridSize / init;

			if (gameStart == true) {
				for (var i = 0 ; i < initGridSize ; i++) {
					generateTile(generateNumber());
				}
			}
		}



		/**
		* move right all numbers
		* @param  {int} sizeGrid the size of the grid
		*/
		function move_right(sizeGrid)
		{
				var move = 0;
				var max = (sizeGrid - 1) // 3
				var y = 3;
				var x = 3;

				while (y >= 0 ) {
					while (x >= 0) {

						var active = $("[x='" + x + "'][y='" + y + "']");
						// si la case active est vide
						if (active.attr("empty") == "true") {
							var next = x - 1;
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								if (cursor.attr("empty") == "false") {
									// -------- deplacement du cursor vers active -> move
									var square = $("[class=element][x='" + next + "'][y='" + y + "']");
									var posX = active.attr("posX");
									square.animate({left: parseFloat(posX) + "px"},300).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									// update of the div to move
									square.attr("x", x);
									// update of the grid
									active.attr("empty", false);
									cursor.attr("empty", true);
									x++;
									move = 1;
									break;
								}
								next--;
							}
						} else {
							// si la case active n'est pas vide
							var next = x - 1;
							var squareActive = $("[class=element][x='" + x + "'][y='" + y + "']");
							var squareActiveVal = parseInt(squareActive.html());
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								var square = $("[class=element][x='" + next + "'][y='" + y + "']");
								var squareVal = parseInt(square.html());
								// si la valeur trouvee par le curseur correspond a la valeur active -> merge
								if (squareActiveVal == squareVal) {
									var sum = squareVal + squareActiveVal;
									// -------- deplacement du cursor vers active -> move
									var posX = active.attr("posX");
									square.animate({left: parseFloat(posX) + "px"}, 200).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									squareActive.remove();
									square.html(sum);
									square.attr("color", sum);
									// update of the div to move
									square.attr("x", x);
									// update of the grid
									cursor.attr("empty", true);
									active.attr("empty", false);
									score = score + sum;
									move = 1;
									break;
								// si la valeur trouvee par le curseur ne correspond pas a la valeur active
								} else if (squareVal != squareActiveVal && cursor.attr("empty") == "false") {
									break;
								}
								next--;
							}
						}
						x--;
					}
						x = 3;
						y--;
				}
			if(move > 0) {
				return 1;
			} else {
				return 0;
			}
		}

		function move_left(sizeGrid)
		{
				var move = 0;
				var max = (sizeGrid - 1) // 3
				var y = 0;
				var x = 0;

				while (y <= max ) {
					while (x <= max) {

						var active = $("[x='" + x + "'][y='" + y + "']");
						// si la case active est vide
						if (active.attr("empty") == "true") {
							var next = x + 1;
							// recherche d'une valeur
							while (next <= 3) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								if (cursor.attr("empty") == "false") {
									// -------- deplacement du cursor vers active -> move
									var square = $("[class=element][x='" + next + "'][y='" + y + "']");
									var posX = active.attr("posX");
									square.animate({left: parseFloat(posX) + "px"},300).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									// update of the div to move
									square.attr("x", x);
									// update of the grid
									active.attr("empty", false);
									cursor.attr("empty", true);
									x--;
									move = 1;
									break;
								}
								next++;
							}
						} else {
							// si la case active n'est pas vide
							var next = x + 1;
							var squareActive = $("[class=element][x='" + x + "'][y='" + y + "']");
							var squareActiveVal = parseInt(squareActive.html());

							// recherche d'une valeur
							while (next <= max) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								var square = $("[class=element][x='" + next + "'][y='" + y + "']");
								var squareVal = parseInt(square.html());

								// si la valeur trouvee par le curseur correspond a la valeur active -> merge
								if (squareActiveVal == squareVal) {
									var sum = squareVal + squareActiveVal;
									// -------- deplacement du cursor vers active -> move
									var posX = active.attr("posX");
									square.animate({left: parseFloat(posX) + "px"}, 200).css("-webkit-translation-timing-function", "cubic-bezier(0,0.5,0.5,0)");
									squareActive.remove();
									square.html(sum);
									square.attr("color", sum);
									// update of the div to move
									square.attr("x", x);
									// update of the grid
									cursor.attr("empty", true);
									active.attr("empty", false);

									score = score + sum;
									move = 1;
									break;
								// si la valeur trouvee par le curseur ne correspond pas a la valeur active
								} else if (squareVal != squareActiveVal && cursor.attr("empty") == "false") {

									break;
								}
								next++;
							}
						}
						x++;
					}
						x = 0;
						y++;
				}
			if(move > 0) {
				return 1;
			} else {
				return 0;
			}
		}

		function move_up(sizeGrid)
		{
				var move = 0;
				var max = (sizeGrid - 1) // 3
				var y = 0;
				var x = 0;

				while (y <= max ) {
					while (x <= max) {

						var active = $("[x='" + x + "'][y='" + y + "']");
						// si la case active est vide
						if (active.attr("empty") == "true") {
							var next = y + 1;
							// recherche d'une valeur
							while (next <= 3) {
								var cursor = $("[x='" + x + "'][y='" + next + "']");
								if (cursor.attr("empty") == "false") {

									// -------- deplacement du cursor vers active -> move
									var square = $("[class=element][x='" + x + "'][y='" + next + "']");
									var posY = active.attr("posY");
									square.animate({top: parseFloat(posY) + "px"},300).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									// update of the div to move
									square.attr("y", y);
									// update of the grid
									active.attr("empty", false);
									cursor.attr("empty", true);
									// -----------------------------------------------
									//
									y--;
									move = 1;
									break;
								}
								next++;
							}
						} else {
							// si la case active n'est pas vide
							var next = y + 1;
							var squareActive = $("[class=element][x='" + x + "'][y='" + y + "']");
							var squareActiveVal = parseInt(squareActive.html());
							// recherche d'une valeur
							while (next <= max) {
								var cursor = $("[x='" + x + "'][y='" + next + "']");
								var square = $("[class=element][x='" + x + "'][y='" + next + "']");
								var squareVal = parseInt(square.html());

								// si la valeur trouvee par le curseur correspond a la valeur active -> merge
								if (squareActiveVal == squareVal) {
									var sum = squareVal + squareActiveVal;

									// -------- deplacement du cursor vers active -> move
									var posY = active.attr("posY");
									square.animate({top: parseFloat(posY) + "px"}, 200).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									squareActive.remove();
									square.html(sum);
									square.attr("color", sum);
									// update of the div to move
									square.attr("y", y);
									// update of the grid
									cursor.attr("empty", true);
									active.attr("empty", false);

									score = score + sum;
									move = 1;

									break;

								// si la valeur trouvee par le curseur ne correspond pas a la valeur active
								} else if (squareVal != squareActiveVal && cursor.attr("empty") == "false") {
									break;
								}
								next++;
							}
						}
						x++;
					}
						x = 0;
						y++;
				}
			if(move > 0) {
				return 1;
			} else {
				return 0;
			}
		}

		function move_down(sizeGrid)
		{
				var move = 0;
				var max = (sizeGrid - 1) // 3
				var y = max;
				var x = max;

				while (y >= 0 ) {
					while (x >= 0) {

						var active = $("[x='" + x + "'][y='" + y + "']");
						// si la case active est vide
						if (active.attr("empty") == "true") {
							var next = y - 1;
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + x + "'][y='" + next + "']");
								if (cursor.attr("empty") == "false") {

									// -------- deplacement du cursor vers active -> move
									var square = $("[class=element][x='" + x + "'][y='" + next + "']");
									var posY = active.attr("posY");
									square.animate({top: parseFloat(posY) + "px"},300).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									// update of the div to move
									square.attr("y", y);
									// update of the grid
									active.attr("empty", false);
									cursor.attr("empty", true);
									// -----------------------------------------------
									y++;
									move = 1;
									break;
								}
								next--;
							}
						} else {
							// si la case active n'est pas vide
							var next = y - 1;
							var squareActive = $("[class=element][x='" + x + "'][y='" + y + "']");
							var squareActiveVal = parseInt(squareActive.html());
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + x + "'][y='" + next + "']");
								var square = $("[class=element][x='" + x + "'][y='" + next + "']");
								var squareVal = parseInt(square.html());
								// si la valeur trouvee par le curseur correspond a la valeur active -> merge
								if (squareActiveVal == squareVal) {
									var sum = squareVal + squareActiveVal;
									// -------- deplacement du cursor vers active -> move
									var posY = active.attr("posY");
									square.animate({top: parseFloat(posY) + "px"}, 200).css("-webkit-translation-timing-function", "cubic-bezier(.25,.55,.26,.76)");
									squareActive.remove();
									square.html(sum);
									square.attr("color", sum);
									// update of the div to move
									square.attr("y", y);
									// update of the grid
									cursor.attr("empty", true);
									active.attr("empty", false);
									score = score + sum;
									move = 1;
									break;

								// si la valeur trouvee par le curseur ne correspond pas a la valeur active
								} else if (squareVal != squareActiveVal && cursor.attr("empty") == "false") {
									break;
								}
								next--;
							}
						}
						x--;
					}
						x = max;
						y--;
				}
			if(move > 0) {
				return 1;
			} else {
				return 0;
			}
		}


		function checkWin(sizeGrid)
		{
			var y = 0;
			var x = 0;
			var nbElement = 0;
			var mergePossibility = 0;
			var maxElement = (sizeGrid * sizeGrid);

			// horizontal check
			while (y < sizeGrid) {
				while (x < sizeGrid) {
					var element = $("[x=" + x + "][y=" + y + "]");
					var content = parseInt(element.attr("content"),10);

					if (x > 0) {
						var elementPrevious = $("[x=" + (x - 1) + "][y=" + y + "]");
						var contentPrevious = parseInt(elementPrevious.attr("content"),10);

						if (element.attr("empty") == "false") {
							nbElement++;
						}
						if (content == contentPrevious) {
							mergePossibility++;
						}
					} else {
						if (element.attr("empty") == "false") {
							nbElement++;
						}
					}
					x++;
				}
				x = 0;
				y++;
			}

			var y = 0;
			var x = 0;
			// vertical check
			while (x < sizeGrid) {
				while (y < sizeGrid) {
					var element = $("[x=" + x + "][y=" + y + "]");
					var content = parseInt(element.attr("content"),10);

					if (y > 0) {
						var elementPrevious = $("[x=" + x + "][y=" + (y - 1) + "]");
						var contentPrevious = parseInt(elementPrevious.attr("content"),10);

						if (content == contentPrevious) {
							mergePossibility++;
						}
					}
					y++;
				}
				y = 0;
				x++;
			}
			if ((mergePossibility == 0) && (nbElement == maxElement)) {
				return 1;
			}
		}


		//  -------------
		//  -- > main <--
		//  -------------

		var gameStart = false;
		var score = 0;
		var paramGrid = 4;
		var arrayPos = [];

		// html generation
		this.after("<div id=\"divInit\">");
		this.after("<div class='score'>")

		// --> game start
		gameStart = true;
		$(".score").html("score: " + 0);
		drawGrid(paramGrid);
		init(paramGrid);
		drawGrid(paramGrid);
		init(paramGrid);


		// --> keyboard move event
		$(document).ready(function()
		{
			var moveReturn;

			$(this).on({
				keydown: function(e)
				{
					switch (e.keyCode) {
						case 38:
						console.log("UP");
						moveReturn = move_up(paramGrid)
							$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());
						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								$('#gameOver').html("Game Over, press enter to play again");
								gameStart = false;
							}
						}
						break;

						case 40:
						console.log("DOWN");
						moveReturn = move_down(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());
						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								$('#gameOver').html("Game Over, press enter to play again");
								gameStart = false;
							}
						}
						break;

						case 37:
						console.log("LEFT");
						moveReturn = move_left(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							setTimeout(generateTile(generateNumber()),200);
						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								$('#gameOver').html("Game Over, press enter to play again");
								gameStart = false;
							}
						}
						break;

						case 39:
						console.log("RIGHT");
						moveReturn = move_right(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							setTimeout(generateTile(generateNumber()),200);

						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								$('#gameOver').html("Game Over, press enter to play again");
								gameStart = false;
							}
						}
						break;

						case 13:
						if (gameStart == false) {
							location.reload();
						}
						break;

					}
				}
			});
		});
		return this;
	};
})(jQuery);
