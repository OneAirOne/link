(function() {

	var canvas = document.getElementById("return");
	// canvas.width = "400";
	// canvas.height = "200";
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	var ctx = canvas.getContext("2d");

	/**
	 * Class of fixed sprites
	 *
	 * @param       {object} options all parameters of the fixed sprites
	 * @constructor
	 */
	function FixedSprite (options) {

		var	frameIndex = 0;
		var tickCount = 0;
		var ticksPerFrame = options.ticksPerFrame || 0;
		var img = new Image();
		this.image = options.image;
		img.src = this.image;
		this.posX = options.posX;
		this.posY = options.posY;
		this.width = options.width;
		this.height = options.height;
		this.url = options.url || '';

		this.draw = () => {
			ctx.drawImage(img, this.posX, this.posY);
		};

		this.initDraw = () => {
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
		this.update = () => {

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
		this.render =  () => {

			this.speed = 3;


			var max = boxes.length

			if (this.direction == "right" ) {

				for (i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "right") == true) {
						return;
					} else {
						if (i == max - 1) {
							this.posX = this.posX + this.speed
						}
					}
				}
			} else if (this.direction == "left") {

				for (i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "left") == true) {
						return;
					} else {
						if (i == max - 1) {
							this.posX = this.posX - this.speed;
						}
					}
				}

			} else if (this.direction == "up") {

				for (i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "up") == true) {
						return;
					} else {
						if (i == max - 1) {
							this.posY = this.posY - this.speed;
						}
					}
				}
			} else if (this.direction == "down") {

				for (i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "down") == true) {
						return;
					} else {
						if (i == max - 1) {
							this.posY = this.posY + this.speed;
						}
					}
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
				(this.width / this.numberOfFrames)*1.2,
				(this.height)*1.2);
		};
	}

	/**
	 * Detect colition between a personnage and an object
	 *
	 * @param  {object} personnage link
	 * @param  {object} object     an object on the map
	 * @param  {string} direction  the direction to move
	 * @return {booleen}
	 */
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
				if (x + spriteSize + speed >= xMin && x + spriteSize + speed<= xMax) {
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

	/**
	 * Detect if object1 is in zone of object2
	 *
	 * @param  {object} object1 one object
	 * @param  {object} object2 another object
	 * @return {booleen}
	 */
	var zoneDetection = (object1, object2) => {
		if (object1.posX >= object2.posX
    		&& object1.posX < object2.posX + object2.width
    		&& object1.posY >= object2.posY
    		&& object1.posY < object2.posY + object2.height) {
					console.log("colision");

					return true;
		} else {
			return false;
		}
	}

	/**
	 * Redirect on key press
	 *
	 * @param  {string} url [description]
	 * @return {void}
	 */
	var activateRedirect = (url) => {
		document.body.addEventListener("keydown", function (event) {
			if (event.keyCode === 65) {
				document.location = url;
			}
		});
	}




	/* OBJECTS CREATON */
	// --------------- //
	//
	var link = new AnimateSprite ({
		width						: 380,
		height					: 38,
		image						: "img/link_static.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 50,
		posY						: 65,
		direction: ""
	});

	var back = new FixedSprite({
		width		: 36, 
		height	: 49,
		image		: "img/return.png",
		posX		: 0,
		posY		: 60
	});

	var backBubble = new FixedSprite({
		width		: 150, 
		height	: 36,
		image		: "img/bubble_back.png",
		posX		: 0,
		posY		: 0,
		url			: "index.html"
	});

	var backZoneBubble = {
		posX 		: back.posX - (0.7 * back.width),
		posY 		: back.posY - (0.7 * back.height),
		height 	: back.height * 4,
		width 	: back.width * 4
	}

	var cv = new FixedSprite({
		width		: 1000, 
		height	: 01439,
		image		: "img/cv.png",
		posX		: 0,
		posY		: 150
	});

	var boxes = [back];

	/*      INIT       */
	// --------------- //
	/**
	 * init the game
	 * @return {void} [
	 */
	function init () {
	}


	/*    GAME LOOP    */
	// --------------- //
	/**
	 * infinite game loop
	 * @return {void}
	 */
	function gameLoop () {

		link.update();
		link.render();
		back.draw();
		cv.draw();

		// check if the personnage is in bubble zone
		if (zoneDetection(link, backZoneBubble)) {
			backBubble.posX = link.posX - 30;
			backBubble.posY = link.posY - 55;
			backBubble.draw();
			console.log(backBubble.url);
			activateRedirect(backBubble.url)
		}

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
						link.image = "img/up.png";
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "down";
						link.image = "img/down.png";
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "left";
						link.image = "img/left.png";
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "right";
						link.image = "img/right.png";
						break;
				}
			},

			keyup: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						link.direction = "";
						link.image = "img/link_static.png";
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "";
						link.image = "img/link_static.png";
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "";
						link.image = "img/link_static.png";
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "";
						link.image = "img/link_static.png";
						break;
				}
			}
		});
	});
})();
