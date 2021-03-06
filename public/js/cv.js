(function() {

	var canvas = document.getElementById("return");
	canvas.height = "1600";
	canvas.width = window.innerWidth

	window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

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

		img.src = this.image;

		/**
		 * update the image
		 * @return {[type]} [description]
		 */
		this.updateImage = () => {
			img.src = this.image;
		}

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

		/**
		 * draw image
		 *
		 * @return {void}
		 */
		this.draw = () => {
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
		}

		// draw the position of sprite updated
		this.render =  () => {

			this.speed = speed;


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
			this.draw();
		};
	}

	/**
	 * avoid an object to go out of the screen
	 *
	 * @param  {object} object element
	 * @return {void}
	 */
	function outOfZone(object) {
		if (object.posX > canvas.width + 30) {
			object.posX = 0;
		}
		if (object.posX < -30) {
			object.posX = canvas.width;
		}
		if (object.poY > (canvas.height / 2)) {
			window.scrollTo(0, canvas.height);
			// object.posY = 1500;
		}
		if (object.posY < 0) {
			object.posY = window.innerHeight;
		}
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
		url			: "index"
	});

	var backZoneBubble = {
		posX 		: back.posX - (0.7 * back.width),
		posY 		: back.posY - (0.7 * back.height),
		height 	: back.height * 4,
		width 	: back.width * 4
	}

	var cv = new FixedSprite({
		width		: 992, 
		height	: 1403,
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

	function noscroll() {
	  window.scrollTo( 0, 0 );
	}

	/*    GAME LOOP    */
	// --------------- //
	/**
	 * infinite game loop
	 * @return {void}
	 */
	function gameLoop () {
		ctx.clearRect(0, 0, canvas.width , canvas.height);
		cv.draw();

		link.update();
		link.render();
		back.draw();


		// check if the personnage is in bubble zone
		if (zoneDetection(link, backZoneBubble)) {
			backBubble.posX = link.posX - 30;
			backBubble.posY = link.posY - 55;
			backBubble.draw();
		}

		window.requestAnimFrame(gameLoop);
	}

	var right = false;
	var left = false;
	var up = false;
	var down = false;
	var speed = 7;

	/* MAIN */
	init();
	gameLoop();


	/*   GAME CONTROL  */
	// --------------- //
	// mouse clickable zones
	$(document).mousedown(function(e) {
		var mouse = {
			posX 		: parseInt(e.clientX),
			posY 		: parseInt(e.clientY),
			width 	:	1,
			height	: 1
		}
		if (zoneDetection(mouse, back)) {
			window.location.href = "index";
		}
	})
	$(document).ready(function()
	{
		$(this).on({
			keydown: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						up = true;
						right = false;
						left = false;
						down = false;
						link.direction = "up";
						link.image = "img/up.png";
						outOfZone(link);
						link.updateImage();
						break;

					case 40:
						console.log("-> DOWN");
						up = false;
						right = false;
						left = false;
						down = true;
						link.direction = "down";
						link.image = "img/down.png";
						link.updateImage();
						break;

					case 37:
						console.log("-> LEFT");
						up = false;
						right = false;
						left = true;
						down = false;
						link.direction = "left";
						link.image = "img/left.png";
						outOfZone(link);
						link.updateImage();
						break;

					case 39:
						console.log("-> RIGHT");
						up = false;
						right = true;
						left = false;
						down = false;
						link.direction = "right";
						link.image = "img/right.png";
						outOfZone(link);
						link.updateImage();
						break;

					case 65:
						document.location = "index";
						break;
					case 81:
						document.location = "index";
				}
			},

			keyup: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						link.direction = "";
						if (right == true) {
							link.image = "img/static_right.png";
						} else if (left == true) {
							link.image = "img/static_left.png";
						} else if (up == true) {
							link.image = "img/static_up.png";
						} else {
							link.image = "img/link_static.png";
						}
						link.updateImage();
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "";
						if (right == true) {
							link.image = "img/static_right.png";
						} else if (left == true) {
							link.image = "img/static_left.png";
						} else if (up == true) {
							link.image = "img/static_up.png";
						} else {
							link.image = "img/link_static.png";
						}
						link.updateImage();
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "";
						if (right == true) {
							link.image = "img/static_right.png";
						} else if (left == true) {
							link.image = "img/static_left.png";
						} else if (up == true) {
							link.image = "img/static_up.png";
						} else {
							link.image = "img/link_static.png";
						}
						link.updateImage();
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "";
						if (right == true) {
							link.image = "img/static_right.png";
						} else if (left == true) {
							link.image = "img/static_left.png";
						} else if (up == true) {
							link.image = "img/static_up.png";
						} else {
							link.image = "img/link_static.png";
						}
						link.updateImage();
						break;
				}
			}
		});
	});
})();
