(function () {

	// canvas optimisation
	window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					function( callback ){
						window.setTimeout(callback, 1000 / 60);
					};
	})();

	var canvas = document.getElementById("deviceMin");
	canvas.width = document.body.clientWidth;
	canvas.height = 100;
	var ctx = canvas.getContext("2d");

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

		this.image 						= options.image;
		this.numberOfFrames 	= options.numberOfFrames || 1;
		this.width 						= options.width;
		this.height 					= options.height;
		this.posX 						= options.posX;
		this.posY 						= options.posY;
		this.direction 				= options.direction;
		this.speed 						= options.speed || 3;
		this.moveDirection 		= options.moveDirection;
		this.dead							= options.dead;
		this.tick							= options.tick;
		this.life							= options.life;
		this.color						= options.color;


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

			// update the image source
			img.src = this.image;

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
	var speedInit = 3;
	var lifeInit = 5;

	var link = new AnimateSprite ({
		width						: 380,
		height					: 38,
		image						: "img/link_static.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: canvas.width / 2 - ((24 * 1.2) / 2),
		posY						: canvas.height / 2,
		direction				: "",
		speed						: speedInit,
		dead						: false,
		life						: lifeInit
	});

	function gameLoop () {
		// clear the canvas each boucle cycle
		ctx.clearRect(0, 0, canvas.width , canvas.height);
		// update link info
		link.update();
		link.render();
		requestAnimFrame(gameLoop);
		// window.requestAnimationFrame(gameLoop);
	}



	gameLoop();


})();
