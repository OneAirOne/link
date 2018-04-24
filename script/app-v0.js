(function() {
	var canvasBg = document.getElementById('background')
	var canvas = document.getElementById('link'),
	ctx = canvas.getContext('2d');
	ctxBack = canvasBg.getContext('2d');

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	var img = {
		'up1'    : 'img/haut1.png',
		'up2'    : 'img/haut2.png',
		'up3'    : 'img/haut3.png',
		'down1'  : 'img/bas1.png',
		'down2'  : 'img/bas2.png',
		'down3'  : 'img/bas3.png',
		'right1' : 'img/droite1.png',
		'right2' : 'img/droite2.png',
		'right3' : 'img/droite3.png',
		'left1'  : 'img/gauche1.png',
		'left2'  : 'img/gauche2.png',
		'left3'  : 'img/gauche3.png'
	}

	var sprite = img['down1'];

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvasBg.width = window.innerWidth;
		canvasBg.height = window.innerHeight;

		var x = canvas.width / 2;
		var y = canvas.height /2;

		function move(direction)
		{
			var speed = 20;

			switch (direction) {

				case "UP":
					y = y - speed;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					ctx.drawImage(link, x, y);
					break;

				case "DOWN":
					y = y + speed;
					ctx.clearRect(0,0, canvas.width, canvas.height);

					ctx.drawImage(link, x, y);
					break;

				case "RIGHT":
					x = x + speed;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					ctx.drawImage(link, x, y);
					break;

				case "LEFT":
					x = x - speed;
					ctx.clearRect(0,0, canvas.width, canvas.height);
					ctx.drawImage(link, x, y);
					break;
			}
		}

		var link = new Image();
		var imageBg = new Image();


		link.src = sprite;
		imageBg.src = 'img/lost_woods1x.png';

		link.onload = function(){
			ctx.drawImage(link, x, y);
		}

		// var centerX = background.width / 2 - imageBg.width / 2;
		// var centerY = background.height / 2 - imageBg.height / 2;
		console.log("imageBg.width: " + imageBg.width);
		console.log("imageBg.height: " + imageBg.height);
		console.log("canvasBg.width: " + canvasBg.width);
		console.log("canvasBg.height: " + canvasBg.height);
		console.log(canvasBg.width);
		console.log(imageBg.height);

		imageBg.onload = function(){
			ctxBack.drawImage(imageBg,
				canvasBg.width / 2 - imageBg.width / 2,
        canvasBg.height / 2 - imageBg.height / 2
			);
		};

		var press;

		$(document).ready(function()
		{
			var up = [img['up1'], img['up2'], img['up3']];
			var down = [img['down1'], img['down2'], img['down3']];
			var right = [img['right1'], img['right2'], img['right3']];
			var left = [img['left1'], img['left2'], img['left3']];
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
								} else if (index == 1) {
									index++;
								} else {
									index = 0;
								}
							break;

						case 40:
							console.log("-> DOWN");
							sprite = down[index];
							link.src = sprite;
							move("DOWN");
							if (index == 0) {
								index++;
							} else if (index == 1) {
								index++;
							} else {
								index = 0;
							}
							break;

						case 37:
							console.log("-> LEFT");
							sprite = left[index];
							link.src = sprite;
							move("LEFT");
							if (index == 0) {
								index++;
							} else if (index == 1) {
								index++;
							} else {
								index = 0;
							}
							break;

						case 39:
							console.log("-> RIGHT");
							sprite = right[index];
							link.src = sprite;
							move("RIGHT");
							if (index == 0) {
								index++;
							} else if (index == 1) {
								index++;
							} else {
								index = 0;
							}
							break;

						case 76:
							console.log("L");
							break;
					}
				}
			});
		});


	}
	resizeCanvas();
})();
