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

		var	frameIndex = 0;
		var tickCount = 0;
		var ticksPerFrame = options.ticksPerFrame || 0;
		var img = new Image();

		this.image = options.image;
		this.numberOfFrames = options.numberOfFrames || 1;
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
						if (frameIndex < this.numberOfFrames - 1) {
								// Go to the next frame
								frameIndex += 1;
						} else {
								frameIndex = 0;
						}
				}
		};

		// draw the position of sprite updated
		this.render = function () {

			this.speed = 3;

			if (this.direction == "right" ) {

				if (collisionDetection(this, sanctuary, "right") == false) {
					this.posX = this.posX + this.speed
				}

			} else if (this.direction == "left") {

				if (collisionDetection(this, sanctuary, "left") == false) {
					this.posX = this.posX - this.speed;
				}

			} else if (this.direction == "up") {

				if (collisionDetection(this, sanctuary, "up") == false) {
					this.posY = this.posY - this.speed;
				}

			} else if (this.direction == "down") {

				if (collisionDetection(this, sanctuary, "down") == false) {
					this.posY = this.posY + this.speed;
				}

			}
			// update the image source
			img.src = this.image;

			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width , canvas.height);

			// Draw the animation
			ctx.drawImage(
				img,
				frameIndex * this.width / this.numberOfFrames, // x position on the sprite sheet
				0,
				this.width / this.numberOfFrames, // x size of the frame
				this.height,
				this.posX,
				this.posY,
				(this.width / this.numberOfFrames) * 1.5,
				(this.height)* 1.5);
		};
	}

	function collisionDetection (personnage, object, direction) {
		var xMin = object.posX;
		var xMax = object.posX + object.width;
		var yMin = object.posY;
		var yMax = object.posY + object.height;
		var x = personnage.posX ;
		var y = personnage.posY ;
		var speed = personnage.speed;
		var spriteSize = personnage.width / personnage.numberOfFrames;

		if (direction == "up") {
			if (x >= xMin && x <= xMax ) {
				if (y - speed  <= yMax && y - speed >= yMin) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		} else if (direction == "right") {
			if (y >= yMin && y <= yMax) {
				if (x + 24 + speed >= xMin && x + spriteSize + speed<= xMax) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		} else if (direction == "left") {
			if ( y >= yMin && y <= yMax) {
				if (x - speed >= xMin && x - speed <= xMax) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		} else if (direction == "down") {
			if (x >= xMin && x <= xMax) {
				if (y + spriteSize + speed >= yMin && y + spriteSize + speed <= yMax) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}


	}



	/* OBJECTS CREATON */
	// --------------- //
	var sanctuary = new FixedSprite({
		width: 80,
		height: 66,
		image: "img/sanctuaire.png",
		posX: canvas.width / 2 - (80 / 2),
		posY: 30
	});

	var link = new AnimateSprite ({
		width: 240,
		height: 24,
		image: "img/link_statique.png",
		numberOfFrames: 10,
		ticksPerFrame: 4,
		posX: canvas.width / 2 - ((24 * 1.5) / 2),
		posY: canvas.height / 2,
		direction: ""
	});



	/*      INIT       */
	// --------------- //
	function init () {
		sanctuary.initDraw();

	}


	/*    GAME LOOP    */
	// --------------- //
	function gameLoop () {
		// console.log("---------------------------")
		// console.log("link.posX: " + link.posX)
		// console.log("link.posY: " + link.posY)
		// console.log("sanctuary.posX: " + sanctuary.posX)
		// console.log("sanctuary.posY: " + sanctuary.posY)
		// if (collisionDetection(link, sanctuary)) {
		//
		// 	link.direction = "";
		// 	link.image = "img/link_statique.png";
		// }
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
