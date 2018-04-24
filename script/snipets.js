(function() {

	var canvas = document.getElementById("map");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");



	/**
	 * Class of fixed sprites
	 *
	 * @param       {object} options all parameters of the fixed sprites
	 * @constructor
	 */
	function FixedSprite (options) {

		var img = new Image();
		this.image = options.image;
		img.src = this.image;
		this.posX = options.posX;
		this.posY = options.posY;
		this.width = options.width;
		this.height = options.height;

		this.update = function() {
			this.draw();
		};

		this.draw = function() {
			ctx.drawImage(img, this.posX, this.posY);
		};

		this.initDraw = function() {
			img.addEventListener('load', function() {
				ctx.drawImage(img, this.posX, this.posY);
			})
		};
	}



	/**
	 * Class of Animate sprites
	 *
	 * @param       {object} options all parameters of animate sprites
	 * @constructor
	 */
	function AnimateSprite (options) {

		// var that = {};
		var	frameIndex = 0;
		var tickCount = 0;
		var ticksPerFrame = options.ticksPerFrame || 0;
		var numberOfFrames = options.numberOfFrames || 1;
		var img = new Image();
		this.image = options.image;

		this.width = options.width;
		this.height = options.height;
		this.posX = options.posX;
		this.posY = options.posY;
		this.direction = options.direction;

		// update position of sprite
		this.update = function () {

				tickCount += 1;

				if (tickCount > ticksPerFrame) {

					tickCount = 0;

						// If the current frame index is in range
						if (frameIndex < numberOfFrames - 1) {
								// Go to the next frame
								frameIndex += 1;
						} else {
								frameIndex = 0;
						}
				}
		};

		// draw the position of sprite updated
		this.render = function () {

			if (this.direction == "right" ) {
				this.posX = this.posX + 3
			} else if (this.direction == "left") {
				this.posX = this.posX - 3;
			} else if (this.direction == "up") {
				this.posY = this.posY - 3;
			} else if (this.direction == "down") {
					this.posY = this.posY + 3;
			}
			// update the image source
			img.src = this.image;

			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width , canvas.height);

			// Draw the animation
			ctx.drawImage(
				img,
				frameIndex * this.width / numberOfFrames, // x position on the sprite sheet
				0,
				this.width / numberOfFrames, // x size of the frame
				this.height,
				this.posX,
				this.posY,
				(this.width / numberOfFrames) * 1.5,
				(this.height)* 1.5);
		};
	}


	/* OBJECTS CREATON */
	// --------------- //
	var sanctuary = new FixedSprite({
		width: 80,
		height: 66,
		image: "img/sanctuaire.png",
		posX: 10,
		posY: 10
	});

	var link = new AnimateSprite ({
		width: 240,
		height: 24,
		image: "img/link_statique.png",
		numberOfFrames: 10,
		ticksPerFrame: 4,
		posX: canvas.width / 2,
		posY: canvas.height / 2,
		direction: ""
	});


	/*      INIT       */
	// --------------- //
	function init () {
		sanctuary.initDraw();
		console.log(sanctuary);
	}


	/*    GAME LOOP    */
	// --------------- //
	function gameLoop () {
		link.update();
		link.render();
		sanctuary.update();
		window.requestAnimationFrame(gameLoop);
	}


	/* MAIN */
	init();
	gameLoop();


	/*   GAME CONTROL  */
	// --------------- //
	$(document).ready(function()
	{
		$(this).on({
			keydown: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						link.direction = "up";
						link.image = "img/link_haut.png";
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "down";
						link.image = "img/link_bas.png";
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "left";
						link.image = "img/link_gauche.png";
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "right";
						link.image = "img/link_droite.png";
						break;
				}
			},

			keyup: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						link.direction = "";
						link.image = "img/link_statique.png";
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "";
						link.image = "img/link_statique.png";
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "";
						link.image = "img/link_statique.png";
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "";
						link.image = "img/link_statique.png";
						break;
				}
			}
		});
	});
})();
