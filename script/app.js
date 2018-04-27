(function() {

	var canvas = document.getElementById("map");
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;
	canvas.width = "800";
	canvas.height = "600";
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



		this.draw = function() {
			ctx.drawImage(img, this.posX, this.posY);
			// ctx.globalCompositeOperation='luminosity';
			ctx.globalCompositeOperation='hard-light';
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

				if (collisionDetection(this, linkedin, "right") == false) {
					this.posX = this.posX + this.speed
				}

			} else if (this.direction == "left") {

				if (collisionDetection(this, linkedin, "left") == false) {
					this.posX = this.posX - this.speed;
				}

			} else if (this.direction == "up") {

				if (collisionDetection(this, linkedin, "up") == false) {
					this.posY = this.posY - this.speed;
				}

			} else if (this.direction == "down") {

				if (collisionDetection(this, linkedin, "down") == false) {
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
				(this.width / this.numberOfFrames)*1.2,
				(this.height)*1.2);
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

	var activateRedirect = (url) => {
		document.body.addEventListener("keydown", function (event) {
			if (event.keyCode === 65) {
				window.location.replace(url);
			}
		});
	}

	var frame = () => {
		ctx.globalCompositeOperation='destination-over';
		ctx.beginPath();
		var offsetX = 30;
		var offsetY = 80;
		var width = canvas.width - offsetX;
		var height = canvas.height - offsetY;

		ctx.moveTo(offsetX, offsetY);
		ctx.lineTo(width, offsetY);
		ctx.lineTo(width, height);
		ctx.lineTo(offsetX, height);
		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();

		ctx.strokeStyle = '#000001';
		ctx.lineWidth = 1;

	}

// press arrow keys to move

	/* OBJECTS CREATON */
	// --------------- //
	var linkedin = new FixedSprite({
		width		: 142, 
		height	: 165,
		image		: "img/linkedin.png",
		posX		: 400 - (142 / 2),
		posY		: 0
	});

	var linkedinBubble = new FixedSprite({
		width		: 150, 
		height	: 36,
		image		: "img/bulle_linkedin.png",
		posX		: 10,
		posY		: 10,
		url			: "https://fr.linkedin.com/in/erwan-gilbert-b184241b"
	});

	var linkedinZoneBubble = {
		posX 		: linkedin.posX,
		posY 		: linkedin.height,
		height 	: 30,
		width 	: linkedin.width
	}

	var link = new AnimateSprite ({
		width						: 240,
		height					: 24,
		image						: "img/link_statique.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: canvas.width / 2 - ((24 * 1.2) / 2),
		posY						: canvas.height / 2,
		direction: ""
	});



	/*      INIT       */
	// --------------- //
	function init () {
		linkedin.initDraw();
	}


	/*    GAME LOOP    */
	// --------------- //
	function gameLoop () {
		// console.log("---------------------------")
		// console.log("link.posX: " + link.posX)
		// console.log("link.posY: " + link.posY)
		// console.log("linkedin.posX: " + linkedin.posX)
		// console.log("linkedin.posY: " + linkedin.posY)
		// console.log(linkedinZoneBubble.posX);

		link.update();
		link.render();
		linkedin.draw();
		if (zoneDetection(link, linkedinZoneBubble)) {
			linkedinBubble.posX = link.posX - 90;
			linkedinBubble.posY = link.posY - 60;
			linkedinBubble.draw();
			console.log(linkedinBubble.url);
			activateRedirect(linkedinBubble.url)
		}

		frame();
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
