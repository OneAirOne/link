(function() {
	var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	var img = {
		'up1'    : 'img/haut1.png',
		'up2'    : 'img/haut2.png',
		'down1'  :'img/bas1.png',
		'down2'  : 'img/bas2.png',
		'right1' : 'img/droite1.png',
		'right2' : 'img/droite2.png',
		'left1'  : 'img/gauche1.png',
		'left2'  : 'img/gauche2.png'
	}

	var sprite = img['down2'];

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var x = canvas.width / 2;
		var y = canvas.height /2;

		function move(direction)
		{
			var speed = 10;

			switch (direction) {

				case "UP":
					y = y - 20;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					ctx.drawImage(link, x, y);
					break;

				case "DOWN":
					y = y + 20;
					ctx.clearRect(0,0, canvas.width, canvas.height);

					ctx.drawImage(link, x, y);
					break;

				case "RIGHT":
					x = x + 20;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					// link.src = sprite;
					// console.log(srite);
					ctx.drawImage(link, x, y);
					break;

				case "LEFT":
					x = x - 20;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					// link.src = sprite;

					ctx.drawImage(link, x, y);
					break;
			}
		}

		link = new Image();
		link.src = sprite;
		link.onload = function(){
			ctx.drawImage(link, x, y);
		}

		var press;

		$(document).ready(function()
		{
			var up = [img['up1'], img['up2']];
			var down = [img['down1'], img['down2']];
			var right = [img['right1'], img['right2']];
			var left = [img['left1'], img['left2']];
			var index = 0;

			$(this).on({

				keydown: function(e)
				{
					switch (e.keyCode) {

						case 38:
							console.log("-> UP");
								sprite = up[index];
								link.src = sprite;
								move("UP");
								if (index == 0) {
									index++;
								} else {
									index--;
								}
							break;

						case 40:
							console.log("-> DOWN");
							sprite = down[index];
							link.src = sprite;
							move("DOWN");
							if (index == 0) {
								index++;
							} else {
								index--;
							}
							break;

						case 37:
							console.log("-> LEFT");
							sprite = left[index];
							link.src = sprite;
							move("LEFT");
							if (index == 0) {
								index++;
							} else {
								index--;
							}
							break;

						case 39:
							console.log("-> RIGHT");
							sprite = right[index];
							link.src = sprite;
							move("RIGHT");
							if (index == 0) {
								index++;
							} else {
								index--;
							}
							break;

						case 76:
							console.log("L");
							break;
					}
				}

				// keyup: function(e)
				// {
				// 	switch (e.keyCode) {
				//
				// 		case 38:
				// 			press = false;
				// 			break;
				//
				// 		case 40:
				// 		press = false;
				// 			break;
				//
				// 		case 37:
				// 			press = false;
				// 			break;
				//
				// 		case 39:
				// 			press = false;
				// 			break;
				// 	}
				//
				// }
			});
		});


	}
	resizeCanvas();


})();
