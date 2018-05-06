(function() {

	var canvas = document.getElementById("map");
	canvas.width = window.innerWidth - 30;
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
		this.image 			= options.image;
		img.src 				= this.image;
		this.posX 			= options.posX;
		this.posY 			= options.posY;
		this.width 			= options.width;
		this.height 		= options.height;
		this.url 				= options.url || '';


		this.draw = () =>
		{
			// ctx.clearRect(this.posX, this.posY, this.width, this.height);
			ctx.drawImage(img, this.posX, this.posY);
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

			var max = boxes.length

			if (this.direction == "right" ) {

				for (var i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "right") == true) {
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
						return;
					} else {
						if (i == max - 1) {
							this.posX = this.posX + this.speed
						}
					}
				}
			} else if (this.direction == "left") {

				for (var i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "left") == true) {
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
						return;
					} else {
						if (i == max - 1) {
							this.posX = this.posX - this.speed;
						}
					}
				}

			} else if (this.direction == "up") {

				for (var i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "up") == true) {
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
						return;
					} else {
						if (i == max - 1) {
							this.posY = this.posY - this.speed;
						}
					}
				}
			} else if (this.direction == "down") {

				for (var i = 0 ; i < max; i++) {
					if (collisionDetection(this, boxes[i], "down") == true) {
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
		var x = personnage.posX + ((personnage.width / personnage.numberOfFrames) / 2);
		var y = personnage.posY + ((personnage.height / personnage.numberOfFrames) / 2);
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

		var x = object1.posX  + ((object1.width / object1.numberOfFrames || 1) / 2);
		var y = object1.posY + (object1.height / 2);
		var object2Width;

		// if object is AnimateSprite width = width / numberOfFrames
		if (object2.numberOfFrames) {
			object2Width = object2.width / object2.numberOfFrames || 1;
		} else {
			object2Width = object2.width;
		}

		if (x >= object2.posX
    		&& x< object2.posX + object2Width
    		&& y >= object2.posY
    		&& y < object2.posY + object2.height) {

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
	var activateRedirect = (url, object) => {
		document.body.addEventListener("keydown", function (event) {
			if (event.keyCode === 65) {
				if (zoneDetection(link, object)) {
					window.location.href = url;
				}
			}
		});
	}



	/**
	 * Animate start message
	 *
	 * @param  {FixedSprite} object object to animate
	 * @param  {int} delay  delay
	 * @param  {int} speed  speed of animation
	 * @return {void}
	 */
	function animateStart (object, delay, speed) {
		if (link.image == "img/link_static.png" && welcome == false) {
			object.draw();
			if (timeStartCount > delay) {
				if (nbLoop == true) {
					object.posY = object.posY + speed;
					nbLoop = false;
				} else {
					object.posY = object.posY - speed;
					nbLoop = true;
				}
				timeStartCount = 0;
			}
		}
	}



	/**
	 * Animate clouds
	 *
	 * @param  {array} object array containing clouds to animates
	 * @param  {int} delay  delay
	 * @param  {int} speed  speed of animation
	 * @return {void}
	 */
	function animateCloud (object, delay, speed) {
		for (var i = 0 ; i < object.length; i++) {
			object[i].draw();
		}
		if (timeCount > delay) {
		for (var i = 0 ; i < object.length; i++) {

			// if (timeCount > delay) {
				if (object[i].posX < canvas.width) {
					object[i].posX = object[i].posX + speed;
				} else {
					object[i].posX = 0 - object[i].width;
				}
			}
			timeCount = 0;
		}
	}


	/**
	 * check collion between one element and the other
	 *
	 * @param  {object} object    one element
	 * @param  {array} objects   	array of element
	 * @param  {string} direction move direction
	 * @return {booleen}          true if collision
	 */
	function checkCollision (object, objects, direction) {
		for (i = 0 ; i < objects.length; i++) {
			if (collisionDetection(object, objects[i], direction) == true) {
				return true;
			}
		}
		return false;
	}



	/**
	 * check zone between one element and the other
	 *
	 * @param  {object} object    one element
	 * @param  {array} objects   	array of element
	 * @return {booleen}          true if collision
	 */
	function checkZone (object, objects) {
		for (i = 0 ; i < objects.length; i++) {

			if (zoneDetection(object, objects[i]) == true) {
				return true;
			}
		}
		return false;
	}



	/**
	 * IA for enemy
	 *
	 * @param  {array} enemy array of enemy
	 * @return {void}
	 */
	function enemyMove(enemy) {

		for (var i = 0 ; i < enemy.length ; i++) {

			if (checkZone(enemy[i], enemyBoxes) == false) {

				if (enemy[i].tick >= 500) {

					if (enemy[i].moveDirection ==  "down") {
						enemy[i].moveDirection = "left";
						enemy[i].image = "img/enemy_nes_left.png";

					} else if (enemy[i].moveDirection == "up") {
						enemy[i].moveDirection = "right";
						enemy[i].image = "img/enemy_nes_right.png";

					} else if (enemy[i].moveDirection == "right") {
						enemy[i].moveDirection = "down";
						enemy[i].image = "img/enemy_nes_down.png";

					} else if (enemy[i].moveDirection == "left") {
						enemy[i].moveDirection = "up";
						enemy[i].image = "img/enemy_nes_up.png";

					}
					enemy[i].tick  = 0;
				}
			}
			if (enemy[i].moveDirection == "down") {
				if (checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) == true || enemy[i].posY >= canvas.height) {
					enemy[i].moveDirection = "up";
					enemy[i].image = "img/enemy_nes_up.png";
				} else {
					enemy[i].posY =  enemy[i].posY + 1;
				}
			} else if (enemy[i].moveDirection == "up") {
				if (checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) == true || enemy[i].posY <= 0) {
					enemy[i].moveDirection = "down";
					enemy[i].image = "img/enemy_nes_down.png";
				} else {
					enemy[i].posY =  enemy[i].posY - 1;
				}
			} else if (enemy[i].moveDirection == "right") {

				if (checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) == true || enemy[i].posX >= canvas.width) {
					enemy[i].moveDirection = "left";
					enemy[i].image = "img/enemy_nes_left.png";
				} else {
					enemy[i].posX =  enemy[i].posX + 1;
				}
			} else if (enemy[i].moveDirection == "left") {
				if (checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) == true || enemy[i].posX <= 0) {
					enemy[i].moveDirection = "right";
					enemy[i].image = "img/enemy_nes_right.png";
				} else {
					enemy[i].posX =  enemy[i].posX - 1;
				}
			}
			enemy[i].tick = enemy[i].tick + 1;
		}
	}



	/**
	 * looking for freespace
	 *
	 * @return {array} array of coordinates
	 */
	function searchFreeSpace () {
		var x = Math.floor(Math.random() * Math.floor(canvas.width /1.5));
		var y = Math.floor(Math.random() * Math.floor(canvas.height/2));

		var searchZone = {
			posX			: x,
			posY			:	y,
			width : enemySize,
			height : enemySize
		}
		while (checkZone(searchZone, boxes) == true) {
			searchZone.posX = Math.floor(Math.random() * Math.floor(canvas.width /1.5));
			searchZone.posY = Math.floor(Math.random() * Math.floor(canvas.height/2));
		}

		return [x,y];
	}



	/**
	 * avoid an object to go out of the screen
	 *
	 * @param  {object} object element
	 * @return {void}
	 */
	function outOfZone (object) {
		if (object.posX > canvas.width) {
			object.posX = 0;
		}
		if (object.posX < 0 ) {
			object.posX = canvas.width;
		}
		if (object.poY > canvas.height) {
			object.posY = 0;
		}
		if (object.posY < 0) {
			object.posY = city.posY;
		}
	}



	/**
	 * spawn an element
	 *
	 * @param  {object} object element to spawn
	 * @return {void}
	 */
	function spawn (object) {
		if (object.dead = true) {
			var coordinates = searchFreeSpace();
			object.posX = coordinates[0];
			object.posY = coordinates[1];
			object.dead = false;
		}
		if (object.moveDirection == "left") {
			object.moveDirection = "up";
			object.image = "img/enemy_nes_up.png"
		} else if (object. moveDirection == "up") {
			object.moveDirection = "down";
			object.image = "img/enemy_nes_down.png"
		} else if (object. moveDirection == "right") {
			object.moveDirection = "left";
			object.image = "img/enemy_nes_left.png"
		} else if (object. moveDirection == "down") {
			object.moveDirection = "right";
			object.image = "img/enemy_nes_right.png"
		}
	}



	/**
	 * update and draw the score
	 *
	 * @param  {array} enemyList list of enemies
	 * @return {void}
	 */
	function drawScore (enemyList) {
		for (var i = 0 ; i < enemyList.length ; i++) {
			// scrore update
			if (enemyList[i].dead == true) {
				score = score + 5;
			} else {
				score;
			}
			// draw score
			ctx.font = "20px Arial";
			if (link.dead == true) {
				ctx.fillStyle = 'white';
			} else {
				ctx.fillStyle = 'black';
			}
			ctx.fillText(`score : ${score}`,welcomeBubble.posX + 40 ,welcomeBubble.posY + 100);
		}
	}



	/**
	 * drawing black screen if the game is loose
	 *
	 * @return {void}
	 */
	function checkLoose() {
		if (link.life <= 0) {
			link.dead = true;
		}
		if (link.dead == true) {
			link.posX	= canvas.width / 2 - ((24 * 1.2) / 2);
			link.posY	= canvas.height / 2;
			link.image = "img/link_static.png"
			welcome = false;
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			drawScore(enemyList);
			gameOver.draw();
			if (tickGameOver < 50) {
				pressEnter.draw();
			} else if (tickGameOver >= 100) {
				tickGameOver = 0;
			}
			tickGameOver++;
		}
	}


	/* OBJECTS CREATON */
	// --------------- //
	var welcome = false;
	var help = false;
	var nbLoop = true;
	var equip = false;
	var timeCount = 0;
	var timeStartCount = 0;
	var right = false;
	var left = false;
	var up = false;
	var down = false;
	var speedInit = 3;
	var enemySize = 30;
	var score = 0;
	var lifeTick = 0;
	var lifeImg = "img/life5.png";
	var tickGameOver = 0;


	// --------------------------------- LINK -------------------------
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
		life						: 5
	});

	// --------------------------------- ENEMY -------------------------
	var enemy = new AnimateSprite ({
		width						: 300,
		height					: enemySize,
		image						: "img/enemy_nes_right.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 500,
		posY						: 600,
		direction				: "",
		speed						: speedInit,
		moveDirection   : "right",
		dead						: false,
		tick						: 0
	});

	var enemyZone = {
		posX 		: enemy.posX - 5,
		posY 		: enemy.posY- 5,
		height 	: 20,
		width 	: 20
	}

	var enemyKillZone = {
		posX 		: enemy.posX - 20,
		posY 		: enemy.posY- 20,
		height 	: 70,
		width 	: 70
	}

	var enemy2 = new AnimateSprite ({
		width						: 300,
		height					: enemySize,
		image						: "img/enemy_nes_left.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 150,
		posY						: 250,
		direction				: "",
		speed						: speedInit,
		moveDirection   : "left",
		dead						: false,
		tick						: 0
	});

	var enemyZone2 = {
		posX 		: enemy2.posX - 5,
		posY 		: enemy2.posY- 5,
		height 	: 20,
		width 	: 20
	}

	var enemyKillZone2 = {
		posX 		: enemy2.posX - 20,
		posY 		: enemy2.posY- 20,
		height 	: 70,
		width 	: 70
	}

	var enemy3 = new AnimateSprite ({
		width						: 300,
		height					: enemySize,
		image						: "img/enemy_nes_down.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 580,
		posY						: 250,
		direction				: "",
		speed						: speedInit,
		moveDirection   : "down",
		dead						: false,
		tick						: 0
	});

	var enemyZone3 = {
		posX 		: enemy3.posX - 5,
		posY 		: enemy3.posY- 5,
		height 	: 20,
		width 	: 20
	}

	var enemyKillZone3 = {
		posX 		: enemy3.posX - 20,
		posY 		: enemy3.posY- 20,
		height 	: 70,
		width 	: 70
	}

	var enemy4 = new AnimateSprite ({
		width						: 300,
		height					: enemySize,
		image						: "img/enemy_nes_down.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 1200,
		posY						:	200,
		direction				: "",
		speed						: speedInit,
		moveDirection   : "down",
		dead						: false,
		tick						: 0
	});

	var enemyZone4 = {
		posX 		: enemy4.posX - 5,
		posY 		: enemy4.posY- 5,
		height 	: 20,
		width 	: 20
	}

	var enemyKillZone4 = {
		posX 		: enemy4.posX - 20,
		posY 		: enemy4.posY- 20,
		height 	: 70,
		width 	: 70
	}

	var enemy5 = new AnimateSprite ({
		width						: 300,
		height					: enemySize,
		image						: "img/enemy_nes_right.png",
		numberOfFrames	: 10,
		ticksPerFrame		: 4,
		posX						: 1000,
		posY						: -5,
		direction				: "",
		speed						: speedInit,
		moveDirection   : "right",
		dead						: false,
		tick						: 0
	});

	var enemyZone5 = {
		posX 		: enemy5.posX - 5,
		posY 		: enemy5.posY- 5,
		height 	: 20,
		width 	: 20
	}

	var enemyKillZone5 = {
		posX 		: enemy5.posX - 20,
		posY 		: enemy5.posY- 20,
		height 	: 70,
		width 	: 70
	}



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
		width		: 96, 
		height	: 80,
		image		: "img/house_color.png",
		posX		: canvas.width / 2,
		posY		: 120
	});

	var bubbleRoom = new FixedSprite({
		width		: 147, 
		height	: 103,
		image		: "img/bubble_room.png",
		posX		: house.posX  + 28,
		posY		: house.posY - 150
	});

	var city = new FixedSprite({
		width		: 1500, 
		height	: 200,
		image		: "img/city_color.png",
		posX		: canvas.width / 2 - ((1070 * 1.2) / 2),
		posY		: canvas.height - 170
	});

	var chillout = new FixedSprite({
		width		:223, 
		height	: 85,
		image		: "img/chillout_color.png",
		posX		: (swimmingPool.posX) +30,
		posY		: (swimmingPool.posY + swimmingPool.height) - 10
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
		posX 		: city.posX ,
		posY 		: city.posY - 50,
		height 	: 30,
		width 	: city.width
	}

	var startBubble = new FixedSprite({
		width		: 390, 
		height	: 50,
		image		: "img/bubble_start.png",
		posX		: (canvas.width / 2) - (390 / 2),
		posY		: link.posY - 80
	});

	var gameOver = new FixedSprite({
		width		: 264, 
		height	: 51,
		image		: "img/game_over.png",
		posX		: (canvas.width / 2) - (264 / 2),
		posY		: (canvas.height / 2) - (51 / 2)
	});

	var pressEnter = new FixedSprite({
		width		: 421, 
		height	: 32,
		image		: "img/press_enter.png",
		posX		: (canvas.width / 2) - (421 / 2),
		posY		: (canvas.height / 2) - (32 / 2) + 100
	});

	var welcomeBubble = new FixedSprite({
		width		: 300, 
		height	: 50,
		image		: "img/bubble_welcome.png",
		posX		: 10,
		posY		: 20
	});

	var helpBubble = new FixedSprite({
		width		: 200, 
		height	: 150,
		image		: "img/bubble_help.png",
		posX		: swimmingPool.posX,
		posY		: 150
	});

	var cloud1 = new FixedSprite({
		width		: 290, 
		height	: 194,
		image		: "img/cloud.png",
		posX		: city.posX + 50,
		posY		: city.posY + 50
	});

	var cloud2 = new FixedSprite({
		width		: 290, 
		height	: 194,
		image		: "img/cloud.png",
		posX		: (canvas.width / 2) - 100 ,
		posY		: city.posY - 20
	});

	var cloud3 = new FixedSprite({
		width		: 290, 
		height	: 194,
		image		: "img/cloud.png",
		posX		: city.posX - 150,
		posY		: city.posY - 20
	});

	var cloud4 = new FixedSprite({
		width		: 290, 
		height	: 194,
		image		: "img/cloud.png",
		posX		: (city.posX + city.width) - 500,
		posY		: city.posY - 20
	});

	var cloudCity = new FixedSprite({
		width		: 4000, 
		height	: 264,
		image		: "img/cloud_city.png",
		posX		: 0,
		posY		: city.posY / 1.1
	});

	var background = new FixedSprite({
		width		: 1024, 
		height	: 768,
		image		: "img/background.png",
		posX		: 0,
		posY		: 0
	});

	var startMosaic = new FixedSprite({
		width		: 300, 
		height	: 300,
		image		: "img/start_mosaic.png",
		posX		: (canvas.width / 2)- (300 / 2),
		posY		: (canvas.height / 2)- (300 / 2)
	});


	var boxes = [linkedin, truck, house, factoryGit, city, chillout];
	var enemyBoxes = [linkedin, truck, house, factoryGit, city, chillout, swimmingPool];
	var enemyList  = [enemy, enemy2, enemy3, enemy4, enemy5];
	var clouds = [cloud1, cloud2, cloud3, cloud4];


	/*      INIT       */
	// --------------- //
	/**
	 * init the game
	 * @return {void} [
	 */
	function init () {
		// swimmingPool.draw();
	}

	/*    GAME LOOP    */
	// --------------- //
	/**
	 * infinite game loop
	 * @return {void}
	 */
	function gameLoop () {

		ctx.clearRect(0, 0, canvas.width , canvas.height);

		var lifeHeart = new FixedSprite({
			width		: 100, 
			height	: 15,
			image		: lifeImg,
			posX		:  welcomeBubble.posX + 40,
			posY		:  welcomeBubble.posY + 60
		});
		if (link.life == 5) {
			lifeImg = "img/life5.png";
		} else if (link.life == 4) {
			lifeImg = "img/life4.png";
		} else if (link.life == 3) {
			lifeImg = "img/life3.png";
		} else if (link.life == 2) {
			lifeImg = "img/life2.png";
		} else if (link.life == 1) {
			lifeImg = "img/life1.png";
		} else {
			lifeImg = "img/life0.png";
		}

		drawScore(enemyList);
		lifeHeart.draw();
		mosaicGit.draw();
		startMosaic.draw();
		swimmingPool.draw();

		enemyMove(enemyList);

		if (enemy.dead == true){
			spawn(enemy);
		}
		enemy.update();
		enemy.render();

		if (enemy2.dead == true){
			spawn(enemy2);
		}
		enemy2.update();
		enemy2.render();

		if (enemy3.dead == true){
			spawn(enemy3);
		}
		enemy3.update();
		enemy3.render();

		if (enemy4.dead == true){
			spawn(enemy4);
		}
		enemy4.update();
		enemy4.render();

		if (enemy5.dead == true){
			spawn(enemy5);
		}
		enemy5.update();
		enemy5.render();

		// update enemy info
		enemyKillZone.posX = enemy.posX - 20,
		enemyKillZone.posY = enemy.posY- 20,
		enemyKillZone2.posX = enemy2.posX - 20,
		enemyKillZone2.posY = enemy2.posY- 20,
		enemyKillZone3.posX = enemy3.posX - 20,
		enemyKillZone3.posY = enemy3.posY- 20,
		enemyKillZone4.posX = enemy4.posX - 20,
		enemyKillZone4.posY = enemy4.posY- 20,
		enemyKillZone5.posX = enemy5.posX - 20,
		enemyKillZone5.posY = enemy5.posY- 20,

		// update link info
		link.update();
		link.render();


		if (checkZone(link, enemyList)) {
			if (lifeTick > 10) {
				link.life = link.life - 1;
				lifeTick = 0;
			} else {
				lifeTick++;
			}
		}




		if (help == true) {
			helpBubble.draw();
		}

		linkedin.draw();
		truck.draw();
		house.draw();
		factoryGit.draw();
		chillout.draw();
		city.draw();
		welcomeBubble.draw();
		bubbleRoom.draw();

		// statics animations
		timeCount ++;
		timeStartCount ++;
		animateStart(startBubble, 45, 7);
		animateCloud(clouds, 7, 1);


		// check if the personnage is in bubble zone
		if (zoneDetection(link, houseZoneBubble)) {
			houseBubble.posX = link.posX - 45;
			houseBubble.posY = link.posY - 60;
			houseBubble.draw();
			activateRedirect(houseBubble.url, houseZoneBubble);
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, linkedinZoneBubble)) {
			linkedinBubble.posX = link.posX - 90;
			linkedinBubble.posY = link.posY - 60;
			linkedinBubble.draw();
			activateRedirect(linkedinBubble.url, linkedinZoneBubble);
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, factoryZoneBubble)) {
			factoryBubble.posX = link.posX - 50;
			factoryBubble.posY = link.posY - 60;
			factoryBubble.draw();
			activateRedirect(factoryBubble.url, factoryZoneBubble);
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, swimmingPoolZoneBubble)) {
			swimmingPoolBubble.posX = link.posX - 150;
			swimmingPoolBubble.posY = link.posY - 60;
			swimmingPoolBubble.draw();
			activateRedirect(swimmingPoolBubble.url, swimmingPoolZoneBubble);
		}

		// check if the personnage is in bubble zone
		if (zoneDetection(link, cityZoneBubble)) {
			cityBubble.posX = link.posX - 40;
			cityBubble.posY = link.posY - 60;
			cityBubble.draw();
			// activateRedirect(cityBubble.url, cityZoneBubble);
		}
		// drawLoose();
		checkLoose();


		window.requestAnimationFrame(gameLoop);
	}


	/* MAIN */
	init();
	gameLoop();




	/*   GAME CONTROL  */
	// --------------- //
		$(document).ready(function()
		{
			var tickPerFrameIncrease = 6;
			var speedIncrease = 6;
			// mouse clickable zones
			$(document).mousedown(function(e) {
				var mouse = {
					posX 		: parseInt(e.clientX),
					posY 		: parseInt(e.clientY),
					width 	:	1,
					height	: 1
				}
				if (zoneDetection(mouse, house)) {
					window.location.href = houseBubble.url;
				}
				if (zoneDetection(mouse, linkedin)) {
					window.location.href = linkedinBubble.url;
				}
				if (zoneDetection(mouse, factoryGit)) {
					window.location.href = factoryBubble.url;
				}
				if (zoneDetection(mouse, swimmingPool)) {
					window.location.href = swimmingPoolBubble.url;
				}
			})

			// MULTIPLE KEY LISTENER
			var map = {37: false, 38: false, 39: false, 40: false, 83: false, 69: false, 88: false, 72: false, 65: false, 13: false};
			$(document).keydown(function(e) {
				if (e.keyCode in map) {
					map[e.keyCode] = true;

					// MOVE -------------------------------------
					// left
					if (map[37]) {
						left = true;

						if (map[37] && map[69] ) {
							if (zoneDetection(link, swimmingPool)) {
									link.image = "img/left_swim.png";
							} else {
								link.numberOfFrames = 7;
								link.width = 270;
								link.image = "img/left_sword.png";
								if (zoneDetection(link, enemyKillZone) == true) {
									enemy.dead = true;
								}
								if (zoneDetection(link, enemyKillZone2) == true) {
									enemy2.dead = true;
								}
								if (zoneDetection(link, enemyKillZone3) == true) {
									enemy3.dead = true;
								}
								if (zoneDetection(link, enemyKillZone4) == true) {
									enemy4.dead = true;
								}
								if (zoneDetection(link, enemyKillZone5) == true) {
									enemy5.dead = true;
								}
							}
						}
						if (map[37] && map[83]) {
							link.speed = speedIncrease;
							link.ticksPerFrame = tickPerFrameIncrease;
						}
						link.direction = "left";
						outOfZone(link);
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
						right = false;
						up = false;
						down = false;
					}
					// right
					if (map[39]) {
						right = true;

						if (map[39] && map[69] ) {
							if (zoneDetection(link, swimmingPool)) {
									link.image = "img/right_swim.png";
							} else {
								link.numberOfFrames = 7;
								link.width = 270;
								link.image = "img/right_sword.png";
								if (zoneDetection(link, enemyKillZone) == true) {
									enemy.dead = true;
								}
								if (zoneDetection(link, enemyKillZone2) == true) {
									enemy2.dead = true;
								}
								if (zoneDetection(link, enemyKillZone3) == true) {
									enemy3.dead = true;
								}
								if (zoneDetection(link, enemyKillZone4) == true) {
									enemy4.dead = true;
								}
								if (zoneDetection(link, enemyKillZone5) == true) {
									enemy5.dead = true;
								}
							}
						}
						if (map[39] && map[83]) {
							link.speed = speedIncrease;
							link.ticksPerFrame = tickPerFrameIncrease;
						}
						link.direction = "right";
						outOfZone(link);
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
						left = false;
						up = false;
						down = false;
					}

					// up
					if (map[38]) {
						up = true;

						if (map[38] && map[69] ) {
							if (zoneDetection(link, swimmingPool)) {
									link.image = "img/left_swim.png";
							} else {
								link.numberOfFrames = 7;
								link.width = 270;
								link.image = "img/up_sword.png";
								if (zoneDetection(link, enemyKillZone) == true) {
									enemy.dead = true;
								}
								if (zoneDetection(link, enemyKillZone2) == true) {
									enemy2.dead = true;
								}
								if (zoneDetection(link, enemyKillZone3) == true) {
									enemy3.dead = true;
								}
								if (zoneDetection(link, enemyKillZone4) == true) {
									enemy4.dead = true;
								}
								if (zoneDetection(link, enemyKillZone5) == true) {
									enemy5.dead = true;
								}
							}
						}
						if (map[38] && map[83]) {
							link.speed = speedIncrease;
							link.ticksPerFrame = tickPerFrameIncrease;
						}
						link.direction = "up";
						outOfZone(link);
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
						right = false;
						left = false;
						down = false;
					}

					// down
					if (map[40]) {
						down = true;

						if (map[40] && map[69]) {
							if (zoneDetection(link, swimmingPool)) {
									link.image = "img/left_swim.png";
							} else {
								link.numberOfFrames = 7;
								link.width = 270;
								link.image = "img/down_sword.png";
								if (zoneDetection(link, enemyKillZone) == true) {
									enemy.dead = true;
								}
								if (zoneDetection(link, enemyKillZone2) == true) {
									enemy2.dead = true;
								}
								if (zoneDetection(link, enemyKillZone3) == true) {
									enemy3.dead = true;
								}
								if (zoneDetection(link, enemyKillZone4) == true) {
									enemy4.dead = true;
								}
								if (zoneDetection(link, enemyKillZone5) == true) {
									enemy5.dead = true;
								}
							}
						}
						if (map[40] && map[83]) {
							link.speed = speedIncrease;
							link.ticksPerFrame = tickPerFrameIncrease;
						}
						link.direction = "down";
						outOfZone(link);
						if (zoneDetection(link, swimmingPool)) {
								link.image = "img/down_swim.png";``
						} else {
							if (equip == true) {
								link.image = "img/down_shield.png";
							} else {
								link.image = "img/down.png";
							}
						}
						welcome = true;
						right = false;
						up = false;
						left = false;
					}


					// SWORD --------------------------------
					if (map[69]) {
						if (zoneDetection(link, swimmingPool)) {
								link.image = "img/left_swim.png";
						} else {
							link.numberOfFrames = 7;
							link.width = 270;
							if (right == true) {
								link.image = "img/right_sword.png";
							} else if (left == true) {
								link.image = "img/left_sword.png";
							} else if (down == true ) {
								link.image = "img/down_sword.png";
							} else if (up == true ) {
								link.image = "img/up_sword.png";
							}
							if (zoneDetection(link, enemyKillZone) == true) {
								enemy.dead = true;
							}
							if (zoneDetection(link, enemyKillZone2) == true) {
								enemy2.dead = true;
							}
							if (zoneDetection(link, enemyKillZone3) == true) {
								enemy3.dead = true;
							}
							if (zoneDetection(link, enemyKillZone4) == true) {
								enemy4.dead = true;
							}
							if (zoneDetection(link, enemyKillZone5) == true) {
								enemy5.dead = true;
							}

						}
					}


					// ACTION ------------------------------
					if (map[88] ) {
						if (zoneDetection(link, swimmingPool)) {
							link.image = "img/right_swim.png";
						} else {
							if (equip == false) {
								link.image = "img/link_static_shield.png";
								equip = true;
							} else {
								link.image = "img/link_static.png";
								equip = false;
							}
						}
					}
					// play again
					if (map[13] ) {
						if (link.dead == true) {
							location.reload();
						}
					}
					// help bubble
					if (map[72] ) {
						if (help == false) {
							help = true;
						} else {
							help = false;
						}
					}
				}
			}).keyup(function(e) {

				link.direction = "";
				if (e.keyCode in map) {
					link.speed = speedInit;
					link.ticksPerFrame = 4;
					map[e.keyCode] = false;
				}
				if (zoneDetection(link, swimmingPool)) {
					link.numberOfFrames = 10;
					link.width = 380;
					link.image = "img/down_swim.png";
				} else {
					link.numberOfFrames = 10;
					link.width = 380;
					if (equip == true) {
						if (right == true) {
							link.image = "img/link_static_shield.png";
						} else if (left == true) {
							link.image = "img/link_static_shield.png";
						} else if (up == true) {
							link.image = "img/link_static_shield.png";
						} else {
							link.image = "img/link_static_shield.png";
						}

					} else {
						if (right == true) {
							link.image = "img/static_right.png";
						} else if (left == true) {
							link.image = "img/static_left.png";
						} else if (up == true) {
							link.image = "img/static_up.png";
						} else {
							link.image = "img/link_static.png";
						}
					}
				}
			});
	});
})();
