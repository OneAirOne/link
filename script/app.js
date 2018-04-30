(function() {

	var canvas = document.getElementById("map");
	// canvas.width = "800";
	canvas.width = window.innerWidth - 30;
	// canvas.height = "600";
	canvas.height = window.innerHeight;
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
			// ctx.globalCompositeOperation='luminosity';
			// ctx.globalCompositeOperation='hard-light';
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
					console.log(i)
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

			// draw elements under link
			swimmingPool.draw();
			mosaicGit.draw();
			// triforce.draw();
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

	/**
	 * Draw a rectangle, limit of the game
	 * @return {[type]} [descrLiption]
	 * @return {void}
	 */
	var frame = () => {
		// ctx.globalCompositeOperation='destination-over';
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


	/* OBJECTS CREATON */
	// --------------- //

	var link = new AnimateSprite ({
		width						: 380,
		height					: 38,
		image						: "img/link_static.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: canvas.width / 2 - ((24 * 1.2) / 2),
		posY						: canvas.height / 2,
		direction: ""
	});



	var linkedin = new FixedSprite({
		width		: 124, 
		height	: 131,
		image		: "img/linkedin_color.png",
		posX		: canvas.width / 1.2,
		posY		: 0
	});

	var truck = new FixedSprite({
		width		: 48, 
		height	: 40,
		image		: "img/truck.png",
		posX		: canvas.width / 1.1,
		posY		: canvas.height / 1.6,
	});

	var swimmingPool = new FixedSprite({
		width		: 240, 
		height	: 120,
		image		: "img/swimmingPool_color.png",
		posX		: canvas.width / 17,
		posY		: canvas.height / 1.9
	});

	var house = new FixedSprite({
		width		: 80, 
		height	: 70,
		image		: "img/house_color.png",
		posX		: canvas.width / 2,
		posY		: 120
	});

	var bubbleRoom = new FixedSprite({
		width		: 147, 
		height	: 103,
		image		: "img/bubble_room.png",
		posX		: house.posX + 15,
		posY		: house.posY - 65
	});

	var garden = new FixedSprite({
		width		: 60, 
		height	: 70,
		image		: "img/garden_color.png",
		posX		: house.posX - 70,
		posY		: house.posY + 25
	});

	var city = new FixedSprite({
		width		: 1500, 
		height	: 200,
		image		: "img/city_color.png",
		posX		: canvas.width / 2 - ((1070 * 1.2) / 2),
		posY		: canvas.height - 170
	});



	var chillout = new FixedSprite({
		width		: 160, 
		height	: 80,
		image		: "img/chillout_color.png",
		posX		: swimmingPool.posX + (swimmingPool.height / 1.35),
		posY		: swimmingPool.posY + swimmingPool.height - 20
 	});

	var factoryGit = new FixedSprite({
		width		: 240, 
		height	: 108,
		image		: "img/factory_git_color.png",
		posX		: canvas.width / 1.4,
		posY		: canvas.height / 2.8
	});


	var mosaicGit = new FixedSprite({
		width		: 88, 
		height	: 31,
		image		: "img/mosaic_git.png",
		posX		: factoryGit.posX + 39 ,
		posY		: factoryGit.posY + factoryGit.height
	});

	// var triforce = new FixedSprite({
	// 	width		: 80, 
	// 	height	: 84,
	// 	image		: "img/triforce.png",
	// 	posX		: link.posX - 25,
	// 	posY		: link.posY -24
	// });

	var linkedinBubble = new FixedSprite({
		width		: 150, 
		height	: 36,
		image		: "img/bubble_linkedin.png",
		posX		: 10,
		posY		: 10,
		url			: "https://fr.linkedin.com/in/erwan-gilbert-b184241b"
	});

	var linkedinZoneBubble = {
		posX 		: linkedin.posX - (0.5 * linkedin.width),
		posY 		: linkedin.posY - (0.5 * linkedin.height),
		height 	: linkedin.height * 2,
		width 	: linkedin.width * 2
	}

	var factoryBubble = new FixedSprite({
		width		: 244, 
		height	: 50,
		image		: "img/bubble_git.png",
		posX		: 10,
		posY		: 10,
		url			: "https://github.com/OneAirOne"
	});

	var factoryZoneBubble = {
		posX 		: factoryGit.posX - (0.3 * factoryGit.width),
		posY 		: factoryGit.posY - (0.3 * factoryGit.height),
		height 	: factoryGit.height * 2,
		width 	: factoryGit.width * 1.5
	}

	var houseBubble = new FixedSprite({
		width		: 203, 
		height	: 50,
		image		: "img/bubble_cv.png",
		posX		: 10,
		posY		: 10,
		url			: "cv.html"
	});

	var houseZoneBubble = {
		posX 		: house.posX - (1.2 * house.width),
		posY 		: house.posY - (0.2 * house.height),
		height 	: house.height * 2,
		width 	: house.width * 3
	}

	var swimmingPoolBubble = new FixedSprite({
		width		: 226, 
		height	: 50,
		image		: "img/bubble_game.png",
		posX		: 10,
		posY		: 10,
		url			: "game.html"
	});

	var swimmingPoolZoneBubble = {
		posX 		: swimmingPool.posX - (1.8 * swimmingPool.width),
		posY 		: swimmingPool.posY - (0.7 * swimmingPool.height),
		height 	: swimmingPool.height * 2,
		width 	: swimmingPool.width * 3
	}

	var cityBubble = new FixedSprite({
		width		: 197, 
		height	: 50,
		image		: "img/bubble_nothing.png",
		posX		: 10,
		posY		: 10,
		url			: "game.html"
	});

	var cityZoneBubble = {
		posX 		: city.posX - 50,
		posY 		: city.posY - 50,
		height 	: city.height ,
		width 	: city.width
	}

	var startBubble = new FixedSprite({
		width		: 300, 
		height	: 50,
		image		: "img/bubble_start.png",
		posX		: link.posX  - (300 / 2),
		posY		: link.posY - 80,
		url			: "game.html"
	});

	var welcomeBubble = new FixedSprite({
		width		: 300, 
		height	: 50,
		image		: "img/bubble_welcome.png",
		posX		: 10,
		posY		: 20,
		url			: "game.html"
	});



	var boxes = [linkedin,truck, house, factoryGit, city, chillout]
	var welcome = false;


	/*      INIT       */
	// --------------- //
	/**
	 * init the game
	 * @return {void} [
	 */
	function init () {
		swimmingPool.draw();
	}


	/*    GAME LOOP    */
	// --------------- //
	/**
	 * infinite game loop
	 * @return {void}
	 */
	var nbLoop = true;
	var equip = false;
	var timeCount = 0;
	function gameLoop () {
		link.update();
		link.render();
		linkedin.draw();

		truck.draw();
		house.draw();
		// garden.draw();
		factoryGit.draw();
		// mosaicGit.draw();
		// swimmingPool.draw();
		chillout.draw();
		city.draw();
		welcomeBubble.draw();
		bubbleRoom.draw();

		timeCount ++;
		if (link.image == "img/link_static.png" && welcome == false) {
			console.log(nbLoop);
			startBubble.draw();
			if (timeCount > 45) {
				if (nbLoop == true) {
					startBubble.posY = startBubble.posY + 7;
					nbLoop = false;
				} else {
					startBubble.posY = startBubble.posY - 7;
					nbLoop = true;

				}
				timeCount = 0;
			}
		}


		// check if the personnage is in bubble zone
		if (zoneDetection(link, houseZoneBubble)) {
			houseBubble.posX = link.posX - 45;
			houseBubble.posY = link.posY - 60;
			houseBubble.draw();
			console.log(houseBubble.url);
			activateRedirect(houseBubble.url)
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, linkedinZoneBubble)) {
			linkedinBubble.posX = link.posX - 90;
			linkedinBubble.posY = link.posY - 60;
			linkedinBubble.draw();
			console.log(linkedinBubble.url);
			activateRedirect(linkedinBubble.url)
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, factoryZoneBubble)) {
			factoryBubble.posX = link.posX - 50;
			factoryBubble.posY = link.posY - 60;
			factoryBubble.draw();
			console.log(factoryBubble.url);
			activateRedirect(factoryBubble.url)
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, swimmingPoolZoneBubble)) {
			swimmingPoolBubble.posX = link.posX - 150;
			swimmingPoolBubble.posY = link.posY - 60;
			swimmingPoolBubble.draw();
			console.log(swimmingPoolBubble.url);
			activateRedirect(swimmingPoolBubble.url)
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, cityZoneBubble)) {
			cityBubble.posX = link.posX - 40;
			cityBubble.posY = link.posY - 60;
			cityBubble.draw();
			console.log("TTTTTTT");
			activateRedirect(cityBubble.url)
		}


		// draw the frame
		// frame();
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
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/up_swim.png";
						} else {

							if (equip == true) {
								link.image = "img/up_shield.png";
							} else {
								link.image = "img/up.png";
							}
						}

						welcome = true;
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "down";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/down_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/down_shield.png";
							} else {
								link.image = "img/down.png";
							}
						}
						welcome = true;
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "left";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/left_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/left_shield.png";
							} else {
								link.image = "img/left.png";
							}
						}
						welcome = true;
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "right";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/right_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/right_shield.png";
							} else {
								link.image = "img/right.png";
							}
						}

						welcome = true;
						break;

						case 69:
							console.log("->E");

							if (zoneDetection(link, swimmingPool)) {
								// link.image = "img/right_swim.png";
							} else {
								link.numberOfFrames = 7;
								link.width = 270;
								link.image = "img/right_sword.png";
							}

							welcome = true;
							break;

							case 87:
								console.log("->W");

								if (zoneDetection(link, swimmingPool)) {
									// link.image = "img/right_swim.png";
								} else {
									link.numberOfFrames = 7;
									link.width = 270;
									link.image = "img/left_sword.png";
								}

								welcome = true;
								break;

								case 78:
									console.log("->N");

									if (zoneDetection(link, swimmingPool)) {
										// link.image = "img/right_swim.png";
									} else {
										link.image = "img/link_static_shield.png";
										equip = true;
									}
									welcome = true;
									break;
									case 82:
										console.log("->R");

										if (zoneDetection(link, swimmingPool)) {
											// link.image = "img/right_swim.png";
										} else {
											link.image = "img/link_static.png";
											equip = false;
										}
										welcome = true;
										break;
				}
			},

			keyup: function(e)
			{
				switch (e.keyCode) {

					case 38:
						console.log("-> UP");
						link.direction = "";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/down_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/link_static_shield.png";
							} else {
								link.image = "img/link_static.png";
							}
						}
						break;

					case 40:
						console.log("-> DOWN");
						link.direction = "";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/down_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/link_static_shield.png";
							} else {
								link.image = "img/link_static.png";
							}
						}
						break;

					case 37:
						console.log("-> LEFT");
						link.direction = "";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/down_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/link_static_shield.png";
							} else {
								link.image = "img/link_static.png";
							}
						}
						break;

					case 39:
						console.log("-> RIGHT");
						link.direction = "";
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/down_swim.png";
						} else {
							if (equip == true) {
								link.image = "img/link_static_shield.png";
							} else {
								link.image = "img/link_static.png";
							}
						}
						break;

						case 69:
							console.log("-> E up");
							link.direction = "";
							if (zoneDetection(link, swimmingPool)) {
								link.numberOfFrames = 10;
								link.width = 380;
								link.image = "img/down_swim.png";
							} else {
								link.numberOfFrames = 10;
								link.width = 380;
								if (equip == true) {
									link.image = "img/link_static_shield.png";
								} else {
									link.image = "img/link_static.png";
								}
							}
							break;

						case 87:
							console.log("-> W up");
							link.direction = "";
							if (zoneDetection(link, swimmingPool)) {
								link.numberOfFrames = 10;
								link.width = 380;
								link.image = "img/down_swim.png";
							} else {
								link.numberOfFrames = 10;
								link.width = 380;
								if (equip == true) {
									link.image = "img/link_static_shield.png";
								} else {
									link.image = "img/link_static.png";
								}
							}
							break;
				}
			}
		});
	});
})();
