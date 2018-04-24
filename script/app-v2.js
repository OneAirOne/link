

(function () {

	var link;
	var linkImage;
	var notPress = true;
	var move = false;

	var canvas = document.getElementById("map");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");

	// movements  when key pressed
	function move_link() {
		move = true;
		if (notPress) {
			move = false;
			linkImage.src = "img/link_statique.png";
			gameLoop();
			return;
		}

		link.update();
		link.render();
		sanctuary.update();
		window.requestAnimationFrame(move_link);

	}

	// movement when no key pressed
	function gameLoop () {
		if (move == true) {
			return;
		}
		console.log("statique");
		link.update();
		link.statique_render();
		console.log("TEST2");
		sanctuary.update();
	  window.requestAnimationFrame(gameLoop);

	}

	function sprite (options) {

		var that = {};
		var	frameIndex = 0;
		var tickCount = 0;
		var ticksPerFrame = options.ticksPerFrame || 0;
		var numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		that.posX = options.posX;
		that.posY = options.posY;
		that.direction = options.direction;

		// update position of sprite
		that.update = function () {

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
		that.render = function () {

			if (that.direction == "right" ) {
				that.posX = that.posX + 3
			} else if (that.direction == "left") {
				that.posX = that.posX - 3;
			} else if (that.direction == "up") {
				that.posY = that.posY - 3;
			} else if (that.direction == "down") {
					that.posY = that.posY + 3;
			}

		  // Clear the canvas
		  that.context.clearRect(0, 0, canvas.width , canvas.height);

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames, // x position on the sprite sheet
		    0,
		    that.width / numberOfFrames, // x size of the frame
		    that.height,
		    that.posX,
		    that.posY,
		    (that.width / numberOfFrames) * 1.5,
		    (that.height)* 1.5);
		};

		// draw the position updated when no key pressed
		that.statique_render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, canvas.width , canvas.height);
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames, // x position on the sprite sheet
		    0,
		    that.width / numberOfFrames, // x size of the frame
		    that.height,
		    that.posX,
		    that.posY,
		    (that.width / numberOfFrames) * 1.5,
		    (that.height)* 1.5);
		};

		return that;
	}


	function Obstacle (x, y, width, height, spriteSheet, ctx) {

		this.x = x;
		this.y = y;

		// image load
		var img = new Image();
		img.src = spriteSheet;

		this.width = width;
		this.height = height;

		this.update = function() {

			this.draw();
		}

		this.draw = function() {
			img.addEventListener('load', function() {
				console.log("DRAWWWW")
				// ctx.drawImage(img, this.x, this.y);
			})
			ctx.drawImage(img, this.x, this.y)
		};
	}




	// Create sprite sheet
	linkImage = new Image();

	// Create sprite
	link = sprite({
		context: ctx,
		width: 240,
		height: 24,
		image: linkImage,
		numberOfFrames: 10,
		ticksPerFrame: 4,
		posX: canvas.width / 2,
		posY: canvas.height / 2,
		direction: ""
	});

	// init
	var sanctuary = new Obstacle(10, 10, 80, 66,  "img/sanctuaire.png", ctx);

	function init () {
		linkImage.src = "img/link_statique.png";

		move_link();
		sanctuary = new Obstacle(10, 10, 80, 66,  "img/sanctuaire.png", ctx);
		// console.log(sanctuary);
		sanctuary.update();
	}
	init()



	// ---------------------------------------------------------------------------
	// move
	$(document).ready(function()
	{
		$(this).on({
			keydown: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						notPress = false;
						link.direction = "up";
						if (move == false) {
							linkImage.src = "img/link_haut.png";
							move_link();
						}
						break;

					case 40:
						console.log("-> DOWN");
						notPress = false;
						link.direction = "down";
						if (move == false) {
							linkImage.src = "img/link_bas.png";
							move_link();
						}
						break;

					case 37:
						console.log("-> LEFT");
						notPress = false;
						link.direction = "left";
						if (move == false) {
							linkImage.src = "img/link_gauche.png";
							move_link();
						}
						break;

					case 39:
						console.log("-> RIGHT");
						notPress = false;
						link.direction = "right"
						if (move == false) {
							linkImage.src = "img/link_droite.png";
							move_link();
						}
						break;
				}
			},

			keyup: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						notPress = true;
						move = false;
						link.direction = ""
						break;

					case 40:
						console.log("-> DOWN");
						notPress = true;
						move = false;
						link.direction = ""
						break;

					case 37:
						console.log("-> LEFT");
						notPress = true;
						move = false;
						link.direction = ""
						break;

					case 39:
						console.log("-> RIGHT");
						notPress = true;
						move = false;
						link.direction = ""
						break;

					case 76:
						console.log("L");
						break;
				}
			}

		});
	});

} ());
