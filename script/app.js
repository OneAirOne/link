

(function () {

	var link;
	var linkImage;
	var canvas;
	var notPress = true;
	var move = false;

	function move_link() {
		move = true;
		if (notPress) {
			move = false;
			linkImage.src = "img/link_statique.png";
			gameLoop();
			return;
		}
		window.requestAnimationFrame(move_link);

	  link.update();
	  link.render();

	}

	function gameLoop () {
		if (move == true) {
			return;
		}
		console.log("statique");
	  window.requestAnimationFrame(gameLoop);

	  link.update();
	  link.statique_render();
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

		that.render = function () {
			console.log(that.direction )
			if (that.direction == "right" ) {
				that.posX = that.posX + 2
			} else if (that.direction == "left") {
				console.log("toto")
				that.posX = that.posX - 2;
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
	// ---------------------------------------------------------------------------
	// Get canvas
	canvas = document.getElementById("link");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;


	// Create sprite sheet
	linkImage = new Image();


	// Create sprite
	link = sprite({
		context: canvas.getContext("2d"),
		width: 240,
		height: 24,
		image: linkImage,
		numberOfFrames: 10,
		ticksPerFrame: 3,
		posX: canvas.width / 2,
		posY: canvas.height / 2,
		direction: ""
	});

	// init
	linkImage.src = "img/link_statique.png";
	move_link();

	$(document).ready(function()
	{
		$(this).on({
			keydown: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						break;

					case 40:
						console.log("-> DOWN");
						break;

					case 37:
						console.log("-> LEFT");
						notPress = false;
						link.direction = "left";
						if (move == false) {
							linkImage.src = "img/link_gauche.png";
							move_link();

						}
						// link.posX = link.posX - 10;
						break;

					case 39:
						console.log("-> RIGHT");
						notPress = false;
						link.direction = "right"
						// link.posX = link.posX + 10;
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
						// linkImage.src = "img/link_statique.png";
						link.direction = ""
						break;

					case 40:
						console.log("-> DOWN");
						notPress = true;
						move = false;
						// linkImage.src = "img/link_statique.png";
						link.direction = ""
						break;

					case 37:
						console.log("-> LEFT");
						notPress = true;
						move = false;
						// linkImage.src = "img/link_statique.png";
						link.direction = ""
						break;

					case 39:
						console.log("-> RIGHT");
						notPress = true;
						move = false;

						// linkImage.src = "img/link_statique.png";
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
