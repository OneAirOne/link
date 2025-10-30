(function () {
  // return if mobile device
  // if (window.innerWidth < 765) {
  // 	return;
  // }

  // browser compatibility
  window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  var canvas = document.getElementById("map");
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  /**
   * Class of fixed sprites
   *
   * @param       {object} options all parameters of the fixed sprites
   * @constructor
   */
  function FixedSprite(options) {
    var frameIndex = 0;
    var tickCount = 0;
    var ticksPerFrame = options.ticksPerFrame || 0;
    var img = new Image();
    this.image = options.image;
    this.posX = options.posX;
    this.posY = options.posY;
    this.width = options.width;
    this.height = options.height;
    this.url = options.url || "";
    img.src = this.image;

    /**
     * draw image
     *
     * @return {void}
     */
    this.draw = () => {
      ctx.drawImage(img, this.posX, this.posY);
      return;
    };

    /**
     * init draw image
     *
     * @return {void}
     */
    this.initDraw = () => {
      ctx.drawImage(img, this.posX, this.posY);
      return;
    };

    /**
     * Udate image loaded
     * @return {[type]} [description]
     */
    this.updateImage = () => {
      img.src = this.image;
    };
  }

  /**
   * Class of Animate sprites
   *
   * @param       {object} options all parameters of animate sprites
   * @constructor
   */
  function AnimateSprite(options) {
    var frameIndex = 0;
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
    this.speed = options.speed || 3;
    this.moveDirection = options.moveDirection;
    this.dead = options.dead;
    this.tick = options.tick;
    this.life = options.life;
    this.color = options.color;

    // load image to the img object
    img.src = this.image;

    /**
     * update the image
     * @return {[type]} [description]
     */
    this.updateImage = () => {
      img.src = this.image;
    };

    /**
     * Update sprite position
     *
     * @return {void}
     */
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
        (frameIndex * this.width) / this.numberOfFrames, // x position on the sprite sheet
        0,
        this.width / this.numberOfFrames, // x size of the frame
        this.height,
        this.posX,
        this.posY,
        (this.width / this.numberOfFrames) * 1.2,
        this.height * 1.2
      );
    };

    /**
     * render sprite and move posX or posY position
     * @return {void}
     */
    this.render = () => {
      var max = boxes.length;

      if (this.direction == "right") {
        for (var i = 0; i < max; i++) {
          if (collisionDetection(this, boxes[i], "right") == true) {
            this.draw();
            return;
          } else {
            if (i == max - 1) {
              this.posX = this.posX + this.speed;
            }
          }
        }
      } else if (this.direction == "left") {
        for (var i = 0; i < max; i++) {
          if (collisionDetection(this, boxes[i], "left") == true) {
            this.draw();
            return;
          } else {
            if (i == max - 1) {
              this.posX = this.posX - this.speed;
            }
          }
        }
      } else if (this.direction == "up") {
        for (var i = 0; i < max; i++) {
          if (collisionDetection(this, boxes[i], "up") == true) {
            this.draw();
            return;
          } else {
            if (i == max - 1) {
              this.posY = this.posY - this.speed;
            }
          }
        }
      } else if (this.direction == "down") {
        for (var i = 0; i < max; i++) {
          if (collisionDetection(this, boxes[i], "down") == true) {
            this.draw();
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
   * Detect colition between a personnage and an object
   *
   * @param  {object} personnage link
   * @param  {object} object     an object on the map
   * @param  {string} direction  the direction to move
   * @return {booleen}
   */
  function collisionDetection(personnage, object, direction) {
    var xMin = object.posX;
    var xMax = object.posX + object.width;
    var yMin = object.posY;
    var yMax = object.posY + object.height;
    var x = personnage.posX + personnage.width / personnage.numberOfFrames / 2;
    var y = personnage.posY + personnage.height / personnage.numberOfFrames / 2;
    var speed = personnage.speed;
    var spriteSize = personnage.width / personnage.numberOfFrames;

    if (direction == "up") {
      if (x >= xMin && x <= xMax) {
        if (y - speed <= yMax && y - speed >= yMin) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (direction == "right") {
      if (y >= yMin && y <= yMax) {
        if (x + spriteSize + speed >= xMin && x + spriteSize + speed <= xMax) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (direction == "left") {
      if (y >= yMin && y <= yMax) {
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
  function zoneDetection(object1, object2) {
    var x = object1.posX + (object1.width / object1.numberOfFrames || 1) / 2;
    var y = object1.posY + object1.height / 2;
    var object2Width;

    // if object is AnimateSprite width = width / numberOfFrames
    if (object2.numberOfFrames) {
      object2Width = object2.width / object2.numberOfFrames || 1;
    } else {
      object2Width = object2.width;
    }

    if (
      x >= object2.posX &&
      x < object2.posX + object2Width &&
      y >= object2.posY &&
      y < object2.posY + object2.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * check collision of spawn zone
   * @param  {object1} object1 object to spawn
   * @param  {object2} object2 object to analyse
   * @return {void}
   */
  function zoneSpawnDetection(object1, object2) {
    var x = object1.posX;
    var y = object1.posY;

    if (
      x >= object2.posX &&
      x < object2.posX + object2.width &&
      y >= object2.posY &&
      y < object2.posY + object2.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * zone detection for the boxes
   *
   * @param  {object} object1 object1
   * @param  {object} object2 object2
   * @return {booleen}
   */
  function zoneDetectionBoxe(object1, object2) {
    var x = object1.posX;
    var y = object1.posY;
    var object2Width;
    var object1Width;

    // if object is AnimateSprite width = width / numberOfFrames
    if (object2.numberOfFrames) {
      object2Width = object2.width / object2.numberOfFrames || 1;
    } else {
      object2Width = object2.width;
    }
    if (object1.numberOfFrames) {
      object1Width = object1.width / object1.numberOfFrames || 1;
    } else {
      object1Width = object1.width;
    }

    if (
      object2.posX >= object1.posX + object1Width ||
      object2.posX + object2Width <= object1.posX ||
      object2.posY >= object1.posY + object1.height ||
      object2.posY + object2.height <= object1.posY
    ) {
      return false;
    } else {
      return true;
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
      if (event.keyCode === 81 || event.keyCode === 65) {
        if (zoneDetection(link, object)) {
          window.location.href = url;
        }
      }
    });
  };

  /**
   * Animate start message
   *
   * @param  {FixedSprite} object object to animate
   * @param  {int} delay  delay
   * @param  {int} speed  speed of animation
   * @return {void}
   */
  function animateStart(object, delay, speed) {
    if (welcome == false) {
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
  function animateCloud(object, delay, speed) {
    for (var i = 0; i < object.length; i++) {
      object[i].draw();
    }
    if (timeCount > delay) {
      for (var i = 0; i < object.length; i++) {
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
  function checkCollision(object, objects, direction) {
    for (i = 0; i < objects.length; i++) {
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
  function checkZone(object, objects) {
    for (i = 0; i < objects.length; i++) {
      if (zoneDetection(object, objects[i]) == true) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check collision for spawn zone
   * @param  {object} object  spawn object
   * @param  {object} objects list of objects to avoid
   * @return {void}
   */
  function checkSpawnZone(object, objects) {
    for (i = 0; i < objects.length; i++) {
      if (zoneSpawnDetection(object, objects[i]) == true) {
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
  function checkZoneBoxes(object, objects) {
    for (i = 0; i < objects.length; i++) {
      if (zoneDetectionBoxe(object, objects[i]) == true) {
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
    for (var i = 0; i < enemy.length; i++) {
      if (checkZone(enemy[i], enemyBoxes) == false) {
        if (enemy[i].tick >= Math.random() * enemyChange) {
          if (enemy[i].moveDirection == "down") {
            enemy[i].moveDirection = "left";
            if (enemy[i].color == "yellow") {
              enemy[i].image = "img/enemy_nes_left.png";
            } else {
              enemy[i].image = "img/enemy_nes_left_red.png";
            }
            enemy[i].updateImage();
          } else if (enemy[i].moveDirection == "up") {
            enemy[i].moveDirection = "right";
            if (enemy[i].color == "yellow") {
              enemy[i].image = "img/enemy_nes_right.png";
            } else {
              enemy[i].image = "img/enemy_nes_right_red.png";
            }
            enemy[i].updateImage();
          } else if (enemy[i].moveDirection == "right") {
            enemy[i].moveDirection = "down";
            if (enemy[i].color == "yellow") {
              enemy[i].image = "img/enemy_nes_down.png";
            } else {
              enemy[i].image = "img/enemy_nes_down_red.png";
            }
            enemy[i].updateImage();
          } else if (enemy[i].moveDirection == "left") {
            enemy[i].moveDirection = "up";
            if (enemy[i].color == "yellow") {
              enemy[i].image = "img/enemy_nes_up.png";
            } else {
              enemy[i].image = "img/enemy_nes_up_red.png";
            }
            enemy[i].updateImage();
          }
          enemy[i].tick = 0;
        }
      }
      if (enemy[i].moveDirection == "down") {
        if (
          checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) ==
            true ||
          enemy[i].posY >= canvas.height
        ) {
          enemy[i].moveDirection = "up";
          if (enemy[i].color == "yellow") {
            enemy[i].image = "img/enemy_nes_up.png";
          } else {
            enemy[i].image = "img/enemy_nes_up_red.png";
          }
          enemy[i].updateImage();
        } else {
          enemy[i].posY = enemy[i].posY + enemy[i].speed;
        }
      } else if (enemy[i].moveDirection == "up") {
        if (
          checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) ==
            true ||
          enemy[i].posY <= 0
        ) {
          enemy[i].moveDirection = "down";
          if (enemy[i].color == "yellow") {
            enemy[i].image = "img/enemy_nes_down.png";
          } else {
            enemy[i].image = "img/enemy_nes_down_red.png";
          }
          enemy[i].updateImage();
        } else {
          enemy[i].posY = enemy[i].posY - enemy[i].speed;
        }
      } else if (enemy[i].moveDirection == "right") {
        if (
          checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) ==
            true ||
          enemy[i].posX >= canvas.width
        ) {
          enemy[i].moveDirection = "left";
          if (enemy[i].color == "yellow") {
            enemy[i].image = "img/enemy_nes_left.png";
          } else {
            enemy[i].image = "img/enemy_nes_left_red.png";
          }
          enemy[i].updateImage();
        } else {
          enemy[i].posX = enemy[i].posX + enemy[i].speed;
        }
      } else if (enemy[i].moveDirection == "left") {
        if (
          checkCollision(enemy[i], enemyBoxes, enemy[i].moveDirection) ==
            true ||
          enemy[i].posX <= 0
        ) {
          enemy[i].moveDirection = "right";
          if (enemy[i].color == "yellow") {
            enemy[i].image = "img/enemy_nes_right.png";
          } else {
            enemy[i].image = "img/enemy_nes_right_red.png";
          }
          enemy[i].updateImage();
        } else {
          enemy[i].posX = enemy[i].posX - enemy[i].speed;
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
  function searchFreeSpace() {
    var x = Math.floor(Math.random() * Math.floor(canvas.width - enemySize));
    var y = Math.floor(Math.random() * Math.floor(canvas.height - enemySize));

    var searchZone = {
      posX: x,
      posY: y,
      width: enemySize * 1,
      height: enemySize * 1,
    };
    while (checkSpawnZone(searchZone, spwanBoxes) == true) {
      searchZone.posX = Math.floor(
        Math.random() * Math.floor(canvas.width - enemySize)
      );
      searchZone.posY = Math.floor(
        Math.random() * Math.floor(canvas.height - enemySize)
      );
    }
    return [searchZone.posX, searchZone.posY];
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
    if (object.poY > city.posY) {
      object.posY = 0;
    }
    if (object.posY < -30) {
      object.posY = city.posY;
    }
  }

  /**
   * spawn an element
   *
   * @param  {object} object element to spawn
   * @return {void}
   */
  function spawn(object) {
    if (object.dead == true) {
      var coordinates = searchFreeSpace();
      object.posX = coordinates[0];
      object.posY = coordinates[1];
      object.dead = false;
      // random color
      nbr = Math.random();
      if (nbr > 0.7) {
        object.speed = 1.8;
        object.color = "red";
      } else {
        object.speed = 1;
        object.color = "yellow";
      }
    }
    if (object.moveDirection == "left") {
      object.moveDirection = "up";
      if (object.color == "yellow") {
        object.image = "img/enemy_nes_up.png";
      } else {
        object.image = "img/enemy_nes_up_red.png";
      }
    } else if (object.moveDirection == "up") {
      object.moveDirection = "down";
      if (object.color == "yellow") {
        object.image = "img/enemy_nes_down.png";
      } else {
        object.image = "img/enemy_nes_down_red.png";
      }
    } else if (object.moveDirection == "right") {
      object.moveDirection = "left";
      if (object.color == "yellow") {
        object.image = "img/enemy_nes_left.png";
      } else {
        object.image = "img/enemy_nes_left_red.png";
      }
    } else if (object.moveDirection == "down") {
      object.moveDirection = "right";
      if (object.color == "yellow") {
        object.image = "img/enemy_nes_right.png";
      } else {
        object.image = "img/enemy_nes_right_red.png";
      }
    }
    object.updateImage();
  }

  /**
   * update and draw the score
   *
   * @param  {array} enemyList list of enemies
   * @return {void}
   */
  function drawScore(enemyList) {
    for (var i = 0; i < enemyList.length; i++) {
      // scrore update
      if (enemyList[i].dead == true) {
        if (enemyList[i].color == "red") {
          score = score + redPoint;
        } else {
          score = score + yellowPoint;
        }
      } else {
        score;
      }
      // draw score
      ctx.font = "20px Arial";
      if (link.dead == true) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillText(
        `score : ${score}`,
        welcomeBubble.posX + 20,
        welcomeBubble.posY + 100
      );
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
      link.posX = canvas.width / 2 - (24 * 1.2) / 2;
      link.posY = canvas.height / 2;
      link.image = "img/link_static.png";
      welcome = false;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawScore(enemyList);
      drawLevel("white");
      gameOver.draw();
      if (tickGameOver < 50) {
        pressEnter.draw();
      } else if (tickGameOver >= 100) {
        tickGameOver = 0;
      }
      tickGameOver++;
    }
  }

  /**
   * swimmingPool animation
   *
   * @return {void}
   */
  function animateSwimmingPool() {
    if (tickSwimmingPool > 100) {
      tickSwimmingPool = 0;
      if (
        swimmingPoolAnimateBubble.image ==
        "img/swimmingPool_animate_bubble1.png"
      ) {
        swimmingPoolAnimateBubble.image =
          "img/swimmingPool_animate_bubble2.png";
      } else if (
        swimmingPoolAnimateBubble.image ==
        "img/swimmingPool_animate_bubble2.png"
      ) {
        swimmingPoolAnimateBubble.image =
          "img/swimmingPool_animate_bubble3.png";
      } else {
        swimmingPoolAnimateBubble.image =
          "img/swimmingPool_animate_bubble1.png";
      }
      swimmingPoolAnimateBubble.updateImage();
    }
  }

  /**
   * draw a rectangle arround a subject => debug function
   *
   * @param  {object} object object to analyse
   * @return {void}
   */
  function drawZone(object) {
    ctx.beginPath();
    ctx.moveTo(object.posX, object.posY);
    ctx.lineTo(object.posX + object.width, object.posY);
    ctx.lineTo(object.posX + object.width, object.posY + object.height);
    ctx.lineTo(object.posX, object.posY + object.height);
    ctx.lineTo(object.posX, object.posY);
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * draw multiple object
   *
   * @param  {object of object} objects objects of multiple objects
   * @return {void}
   */
  function drawObjects(objects) {
    var nbObject = Object.keys(objects).length;

    for (var i = 1; i <= nbObject; i++) {
      objects[i].draw();
    }
  }

  /**
   * check if each sprite of herb are cut and update image if true
   *
   * @param  {[type]} objects [description]
   * @return {[type]}         [description]
   */
  function cutCheck(objects) {
    var nbObject = Object.keys(objects).length;

    for (var i = 1; i <= nbObject; i++) {
      if (zoneDetectionBoxe(swordZone, objects[i]) == true) {
        objects[i].image = "img/herbe_cut.png";
        // update the image of FixedSprite
        objects[i].updateImage();
      }
    }
  }

  /**
   * adapte the heart image with the link.life property
   *
   * @return {void}
   */
  function checkLife() {
    if (link.life == lifeInit) {
      lifeHeart.image = "img/life5.png";
    } else if (link.life == lifeInit - 1) {
      lifeHeart.image = "img/life4.png";
    } else if (link.life == lifeInit - 2) {
      lifeHeart.image = "img/life3.png";
    } else if (link.life == lifeInit - 3) {
      lifeHeart.image = "img/life2.png";
    } else if (link.life == lifeInit - 4) {
      lifeHeart.image = "img/life1.png";
    } else {
      lifeHeart.image = "img/life0.png";
    }
    lifeHeart.updateImage();
  }

  /**
   * update life of an object
   *
   * @param  {object} object object to update
   * @return {void}
   */
  function lifeUpdate(object) {
    if (hit == false) {
      if (checkZoneBoxes(object, enemyList)) {
        if (lifeTick > maxLifeFirstTick) {
          link.life = link.life - 1;
          checkLife();
          hit = true;
          lifeTick = 0;
          maxLifeFirstTick = 0;
        }
      }
    }
    if (lifeTick > maxLifeTick) {
      lifeTick = 0;
      hit = false;
    }
    lifeTick++;
    maxLifeFirstTick++;
  }

  /**
   * heart spawn
   *
   * @return {void}
   */
  function lifeSpawn() {
    // random number
    var nbr = Math.random();
    if (
      nbr > heartProbability &&
      randomHeart == false &&
      tickHeart >= maxTickHeart
    ) {
      if (link.life < minLife) {
        heartVisible = true;
        randomHeart = true;
        heart.draw();
      }
    }
    // draw every loop cycle
    if (link.life < minLife && randomHeart == true) {
      heart.draw();
    }
    if (heartDelay > maxHeartDelay) {
      randomHeart = false;
      heartVisible = false;
      tickHeart = 0;
      // change coordinates for the next heart
      var coordinates = searchFreeSpace();
      heart.posX = coordinates[0];
      heart.posY = coordinates[1];
      heartDelay = 0;
    }
  }

  /**
   * increase life
   *
   * @return {void}
   */
  function lifeIncrease() {
    if (heartVisible == true) {
      if (zoneDetectionBoxe(lifeZone, heart) == true) {
        if (link.life < lifeInit) {
          link.life = link.life + 1;
          checkLife();
          randomHeart = false;
          heartVisible = false;
          tickHeart = 0;
          // change coordinates for the next heart
          var coordinates = searchFreeSpace();
          heart.posX = coordinates[0];
          heart.posY = coordinates[1];
        }
      }
    }
  }

  /**
   * draw level
   *
   * @param  {string} color font color
   * @return {void}
   */
  function drawLevel(color) {
    ctx.fillStyle = color;
    ctx.font = "13px Arial";
    ctx.fillText(
      `Level ${level}`,
      welcomeBubble.posX + 20,
      welcomeBubble.posY + 200
    );
  }

  /**
   * draw hightScore
   *
   * @param  {string} color font color
   * @return {void}
   */
  function drawHightScore(color) {
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.fillText(
      `High Score `,
      welcomeBubble.posX + 20,
      welcomeBubble.posY + 130
    );
    ctx.font = "14px Arial";
    // console.log("hightScore ", hightScore);
    // console.log("bestPlayer ", bestPlayer);
    if (bestPlayer != undefined && hightScore != undefined) {
      ctx.fillText(
        `${bestPlayer[0]} : ${hightScore[0]}`,
        welcomeBubble.posX + 20,
        welcomeBubble.posY + 150
      );
      ctx.fillText(
        `${bestPlayer[1]} : ${hightScore[1]}`,
        welcomeBubble.posX + 20,
        welcomeBubble.posY + 165
      );
      ctx.fillText(
        `${bestPlayer[2]} : ${hightScore[2]}`,
        welcomeBubble.posX + 20,
        welcomeBubble.posY + 180
      );
    }
  }

  /**
   * draw new score
   *
   * @param  {string} color font color
   * @return {void}
   */
  function drawNewScore(color) {
    console.log("color ", color);
    ctx.fillStyle = color;
    ctx.font = "18px Arial";
    ctx.fillText(
      `New high score !`,
      welcomeBubble.posX + 170,
      welcomeBubble.posY + 95
    );
    // ctx.fillText(`New high score !`, welcomeBubble.posX + 170, welcomeBubble.posY + 95);
  }

  /**
   * draw nb of player
   *
   * @param  {string} color font color
   * @return {void}
   */
  function drawNbPlayer(color) {
    if (nbUserConnected != undefined) {
      ctx.fillStyle = color;
      ctx.font = "12px Arial";
      if (nbUserConnected == 1) {
        ctx.fillText(
          `${nbUserConnected} player connected`,
          welcomeBubble.posX + 190,
          welcomeBubble.posY + 60
        );
      } else {
        ctx.fillText(
          `${nbUserConnected} players connected`,
          welcomeBubble.posX + 190,
          welcomeBubble.posY + 60
        );
      }
    }
  }

  /**
   * draw help info
   *
   * @param  {string} color font color
   * @return {void}
   */
  function drawHelpInfo(color) {
    ctx.font = " bold 13px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `Press 'H' for help`,
      welcomeBubble.posX + 20,
      welcomeBubble.posY + 220
    );
  }

  /**
   * draw dammage
   *
   * @param  {string} color  font color
   * @param  {int} points points to draw
   * @return {[type]}        [description]
   */
  function drawDammage(color, points) {
    ctx.fillStyle = color;
    ctx.font = "15px Arial";
    var points = nbPoints;
    ctx.fillText(points, deadX, deadY);
  }

  /**
   * check enemy life
   *
   * @return {void}
   */
  function checkEnemyLife() {
    for (var i = 0; i < enemyKillZoneList.length; i++) {
      if (zoneDetectionBoxe(link, enemyKillZoneList[i]) == true) {
        enemyList[i].dead = true;
        dammage = true;
        deadX = enemyList[i].posX;
        deadY = enemyList[i].posY;
        if (enemyList[i].color == "red") {
          nbPoints = `+ ${redPoint}`;
        } else {
          nbPoints = `+ ${yellowPoint}`;
        }
      }
    }
  }

  /**
   * ask player name
   *
   * @return {void}
   */
  function askName() {
    var txt;
    var person = prompt("New High Score ! Please enter your name:", "Erwan");
    keyPush = false;
    link.direction = "";
    link.updateImage();
    if (person == null || person == "") {
      playerName = "random";
    } else {
      playerName = person;
    }
  }

  /**
   * increase level
   *
   * @return {void}
   */
  function levelUp() {
    if (
      score % 50 == 0 &&
      generate == false &&
      enemyList.length <= maxEnemyNb
    ) {
      level++;

      var newEnemy = new AnimateSprite({
        width: 300,
        height: enemySize,
        image: "img/enemy_nes_right.png",
        numberOfFrames: 10,
        ticksPerFrame: 4,
        posX: 200,
        posY: 50,
        direction: "",
        speed: 1,
        moveDirection: "right",
        dead: false,
        tick: 0,
        color: "yellow",
      });

      enemyList.push(newEnemy);

      enemyKillZoneList.push({
        posX: enemy.posX + killZoneX,
        posY: enemy.posY + killZoneY,
        height: killZoneHeight,
        width: killZoneWidth,
      });
      generate = true;
    }
    if (score % 50 != 0) {
      generate = false;
    }
  }

  /* OBJECTS CREATON */
  // --------------- //

  // general settings
  var welcome = false;
  var help = false;
  var nbLoop = true;
  var equip = false;
  var timeCount = 0;
  var timeStartCount = 0;
  var right = false;
  var left = false;
  var up = false;
  var down = true;
  var speedInit = 3;
  var enemySize = 30;
  var score = 0;
  var lifeTick = 0;
  var tickGameOver = 0;
  var tickSwimmingPool = 0;
  var heartVisible;
  var randomHeart = false;
  var lifeInit = 5;
  var tickHeart = 0;
  var hit = false;
  var heartDelay = 0;
  var newMsg = false;
  var nbUserConnected;
  var tickMsg = 0;
  var tickDammage = 0;
  var dammage = false;
  var nbPoints = 0;
  var deadX;
  var deadY;
  var keyPush;
  var bestPlayer;
  var hightScore;
  var playerName;
  var generate = false;
  var dev = false;

  // gameplay>> settings
  var swordOffsetX = 16;
  var swordOffsetY = 15;
  var lifeOffsetX = 6;
  var lifeOffsetY = 2;
  var initMaxLifeTick = 150;
  var maxLifeTick = initMaxLifeTick;
  var killZoneX = -3;
  var killZoneY = -3;
  var killZoneWidth = 30;
  var killZoneHeight = 30;
  var maxTickHeart = 10; //500
  var heartProbability = 0.995;
  var minLife = 5;
  var initFirstTick = 10;
  var maxLifeFirstTick = initFirstTick;
  var maxHeartDelay = 1000;
  var level = 0;
  var maxTickMsg = 140;
  var maxDammage = 50;
  var redPoint = 20;
  var yellowPoint = 5;
  var shieldOption = 120;
  var maxEnemyNb = 100;
  var enemyChange = 5000;

  if (dev == true) {
    var socket = io("http://localhost:3000");
    console.log("connection", socket);
  } else {
    var socket = io("http://51.254.38.133:3000");
  }



  socket.on("news", function (data) {
    console.log("news ", data);
    hightScore = data["highscore"];
    nbUserConnected = data["nbUser"];
    bestPlayer = data["playerName"];

    if (data["publish"] == "new") {
      newMsg = true;
    }
    // console.log("hightScore ", hightScore);
  });

  // --------------------------------- LINK -------------------------
  var link = new AnimateSprite({
    width: 380,
    height: 38,
    image: "img/link_static.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: canvas.width / 2 - (24 * 1.2) / 2,
    posY: canvas.height / 2,
    direction: "",
    speed: speedInit,
    dead: false,
    life: lifeInit,
  });

  // --------------------------------- ENEMY -------------------------
  var enemy = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_right.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 200,
    posY: 50,
    direction: "",
    speed: 1,
    moveDirection: "right",
    dead: false,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone = {
    posX: enemy.posX + killZoneX,
    posY: enemy.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };

  var enemy2 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_left.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 150,
    posY: 250,
    direction: "",
    speed: 1,
    moveDirection: "left",
    dead: false,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone2 = {
    posX: enemy2.posX + killZoneX,
    posY: enemy2.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };

  var enemy3 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_down.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 580,
    posY: 250,
    direction: "",
    speed: 1,
    moveDirection: "down",
    dead: false,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone3 = {
    posX: enemy3.posX + killZoneX,
    posY: enemy3.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };

  var enemy4 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_down.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 1200,
    posY: 200,
    direction: "",
    speed: 1,
    moveDirection: "down",
    dead: false,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone4 = {
    posX: enemy4.posX + killZoneX,
    posY: enemy4.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };

  var enemy5 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_right.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 1000,
    posY: -5,
    direction: "",
    speed: 1,
    moveDirection: "right",
    dead: false,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone5 = {
    posX: enemy5.posX + killZoneX,
    posY: enemy5.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };

  var enemy6 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_right.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 1000,
    posY: -5,
    direction: "",
    speed: 1,
    moveDirection: "right",
    dead: true,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone6 = {
    posX: enemy6.posX + killZoneX,
    posY: enemy6.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };
  var enemy7 = new AnimateSprite({
    width: 300,
    height: enemySize,
    image: "img/enemy_nes_right.png",
    numberOfFrames: 10,
    ticksPerFrame: 4,
    posX: 1000,
    posY: -5,
    direction: "",
    speed: 1,
    moveDirection: "right",
    dead: true,
    tick: 0,
    color: "yellow",
  });

  var enemyKillZone7 = {
    posX: enemy7.posX + killZoneX,
    posY: enemy7.posY + killZoneY,
    height: killZoneHeight,
    width: killZoneWidth,
  };
  // ----------------------------------------------------

  var heart = new FixedSprite({
    width: 18,
    height: 14,
    image: "img/heart.png",
    posX: link.posX + 30,
    posY: link.posY + 30,
  });

  var linkedin = new FixedSprite({
    width: 124,
    height: 131,
    image: "img/linkedin_color.png",
    posX: canvas.width / 1.2,
    posY: 0,
  });

  var truck = new FixedSprite({
    width: 48,
    height: 40,
    image: "img/truck.png",
    posX: canvas.width / 1.1,
    posY: canvas.height / 1.6,
  });

  var swimmingPool = new FixedSprite({
    width: 240,
    height: 120,
    image: "img/swimmingPool.png",
    posX: canvas.width / 17,
    posY: canvas.height / 2.3,
  });

  var swimmingPoolAnimateBubble = new FixedSprite({
    width: 240,
    height: 120,
    image: "img/swimmingPool_animate_bubble1.png",
    posX: swimmingPool.posX,
    posY: swimmingPool.posY,
  });

  var house = new FixedSprite({
    width: 100,
    height: 80,
    image: "img/house_color.png",
    posX: canvas.width / 2,
    posY: 120,
  });

  var bubbleRoom = new FixedSprite({
    width: 147,
    height: 90,
    image: "img/bubble_room.png",
    posX: house.posX + 28,
    posY: house.posY - 50,
  });

  var city = new FixedSprite({
    width: 1500,
    height: 200,
    image: "img/city_color.png",
    posX: canvas.width / 2 - (1070 * 1.2) / 2,
    posY: canvas.height - 170,
  });

  var chillout = new FixedSprite({
    width: 223,
    height: 85,
    image: "img/chillout_color.png",
    posX: swimmingPool.posX + 30,
    posY: swimmingPool.posY + swimmingPool.height - 10,
  });

  var factoryGit = new FixedSprite({
    width: 240,
    height: 108,
    image: "img/gitLab_color.png",
    posX: canvas.width / 1.4,
    posY: canvas.height / 2.8,
  });

  var mosaicGit = new FixedSprite({
    width: 88,
    height: 31,
    image: "img/mosaic_git.png",
    posX: factoryGit.posX + 39,
    posY: factoryGit.posY + factoryGit.height,
  });

  var linkedinBubble = new FixedSprite({
    width: 150,
    height: 36,
    image: "img/bubble_linkedin.png",
    posX: 10,
    posY: 10,
    url: "https://fr.linkedin.com/in/erwan-gilbert-b184241b",
  });

  var linkedinZoneBubble = {
    posX: linkedin.posX - 0.5 * linkedin.width,
    posY: linkedin.posY - 0.5 * linkedin.height,
    height: linkedin.height * 2,
    width: linkedin.width * 2,
  };

  var factoryBubble = new FixedSprite({
    width: 244,
    height: 50,
    image: "img/bubble_git.png",
    posX: 10,
    posY: 10,
    url: "https://github.com/OneAirOne",
  });

  var factoryZoneBubble = {
    posX: factoryGit.posX - 0.3 * factoryGit.width,
    posY: factoryGit.posY - 0.3 * factoryGit.height,
    height: factoryGit.height * 2,
    width: factoryGit.width * 1.5,
  };

  var houseBubble = new FixedSprite({
    width: 203,
    height: 50,
    image: "img/bubble_cv.png",
    posX: 10,
    posY: 10,
    url: "cv",
  });

  var houseZoneBubble = {
    posX: house.posX - 1.2 * house.width,
    posY: house.posY - 0.2 * house.height,
    height: house.height * 2,
    width: house.width * 3,
  };

  var swimmingPoolBubble = new FixedSprite({
    width: 226,
    height: 50,
    image: "img/bubble_game.png",
    posX: 10,
    posY: 10,
    url: "game",
  });

  var swimmingPoolZoneBubble = {
    posX: swimmingPool.posX - 1.8 * swimmingPool.width,
    posY: swimmingPool.posY - 0.7 * swimmingPool.height,
    height: swimmingPool.height * 2,
    width: swimmingPool.width * 3,
  };

  var cityBubble = new FixedSprite({
    width: 197,
    height: 50,
    image: "img/bubble_nothing.png",
    posX: 10,
    posY: 10,
    url: "",
  });

  var cityZoneBubble = {
    posX: city.posX,
    posY: city.posY - 50,
    height: 30,
    width: city.width,
  };

  var startBubble = new FixedSprite({
    width: 390,
    height: 50,
    image: "img/bubble_start.png",
    posX: canvas.width / 2 - 390 / 2,
    posY: link.posY - 80,
  });

  var gameOver = new FixedSprite({
    width: 264,
    height: 51,
    image: "img/game_over.png",
    posX: canvas.width / 2 - 264 / 2,
    posY: canvas.height / 2 - 51 / 2,
  });

  var pressEnter = new FixedSprite({
    width: 421,
    height: 32,
    image: "img/press_enter.png",
    posX: canvas.width / 2 - 421 / 2,
    posY: canvas.height / 2 - 32 / 2 + 100,
  });

  var welcomeBubble = new FixedSprite({
    width: 300,
    height: 50,
    image: "img/bubble_welcome.png",
    posX: 10,
    posY: 20,
  });

  var helpBubble = new FixedSprite({
    width: 200,
    height: 150,
    image: "img/bubble_help.png",
    posX: linkedin.posX - 220,
    posY: linkedin.posY + 10,
  });

  var cloud1 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: city.posX + 20,
    posY: city.posY + 20,
  });

  var cloud2 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: city.posX + 200,
    posY: city.posY + 100,
  });

  var cloud3 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: swimmingPool.posX + 200,
    posY: swimmingPool.posY - 150,
  });

  var cloud4 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: city.posX + city.width - 500,
    posY: city.posY - 20,
  });

  var cloud5 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: factoryGit.posX - 50,
    posY: factoryGit.posY + 150,
  });

  var cloud6 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: linkedin.posX - 300,
    posY: linkedin.posY + 100,
  });

  var cloud7 = new FixedSprite({
    width: 290,
    height: 174,
    image: "img/cloud.png",
    posX: canvas.width / 2,
    posY: city.posY + 100,
  });

  var background = new FixedSprite({
    width: 1024,
    height: 768,
    image: "img/background.png",
    posX: 0,
    posY: 0,
  });

  var pave = new FixedSprite({
    width: 30,
    height: 15,
    image: "img/paves.png",
    posX: house.posX + 23,
    posY: house.posY + 80,
  });

  var lifeHeart = new FixedSprite({
    width: 100,
    height: 15,
    image: "img/life5.png",
    posX: welcomeBubble.posX + 20,
    posY: welcomeBubble.posY + 60,
  });

  var sewer = new FixedSprite({
    width: 100,
    height: 15,
    image: "img/sewer.png",
    posX: truck.posX - 40,
    posY: truck.posY + 90,
  });

  var sewer2 = new FixedSprite({
    width: 100,
    height: 15,
    image: "img/sewer.png",
    posX: city.posX + 120,
    posY: city.posY + 50,
  });

  var extinguisher = new FixedSprite({
    width: 25,
    height: 32,
    image: "img/extinguisher.png",
    posX: truck.posX + 40,
    posY: truck.posY + 80,
  });

  var start_mosaic = new FixedSprite({
    width: 62,
    height: 62,
    image: "img/triforce.png",
    posX: canvas.width / 2 - 10,
    posY: canvas.height / 2,
  });

  // creation of an object of herb object
  var herbs = {};
  var startXPosition = house.posX - 95;
  var startYPosition = house.posY - 66;

  for (var i = 1; i <= 50; i++) {
    var width = 16;
    var height = 16;
    var name = "herbe";

    herbs[i] = new FixedSprite({
      width: width,
      height: height,
      image: "img/herbe.png",
      posX: startXPosition,
      posY: startYPosition,
    });

    // update position of the herb
    startXPosition = startXPosition + width;

    if (i % 10 == 0) {
      startXPosition = house.posX - 95;
      startYPosition = startYPosition + height;
    }

    if (i > 30 && i % 5 == 0) {
      startXPosition = house.posX - 95;
      startYPosition = startYPosition + height;
    }
  }

  var swordZone = new FixedSprite({
    width: 42,
    height: 45,
    image: "",
    posX: 0,
    posY: 0,
  });

  var lifeZone = new FixedSprite({
    width: 20,
    height: 20,
    image: "",
    posX: 0,
    posY: 0,
  });

  var spawnSwimmingZone = {
    posX: swimmingPool.posX - 50,
    posY: swimmingPool.posY - 50,
    width: swimmingPool.width + 100,
    height: swimmingPool.height + 100,
  };

  var spawnLinkedinZone = {
    posX: linkedin.posX - 50,
    posY: linkedin.posY - 50,
    width: linkedin.width + 100,
    height: linkedin.height + 100,
  };

  var spawnTruckZone = {
    posX: truck.posX - 50,
    posY: truck.posY - 50,
    width: truck.width + 100,
    height: truck.height + 100,
  };

  var spawnHouseZone = {
    posX: house.posX - 50,
    posY: house.posY - 50,
    width: house.width + 100,
    height: house.height + 100,
  };

  var spawnFactoryGitZone = {
    posX: factoryGit.posX - 50,
    posY: factoryGit.posY - 50,
    width: factoryGit.width + 100,
    height: factoryGit.height + 100,
  };

  var spawnCityZone = {
    posX: city.posX - 50,
    posY: city.posY - 50,
    width: city.width + 100,
    height: city.height + 100,
  };

  var spawnChilloutZone = {
    posX: chillout.posX - 50,
    posY: chillout.posY - 50,
    width: chillout.width + 100,
    height: chillout.height + 100,
  };

  var boxes = [
    linkedin,
    truck,
    house,
    factoryGit,
    city,
    chillout,
    extinguisher,
  ];
  var enemyBoxes = [
    linkedin,
    truck,
    house,
    factoryGit,
    city,
    chillout,
    swimmingPool,
  ];
  var spwanBoxes = [
    spawnLinkedinZone,
    spawnTruckZone,
    spawnHouseZone,
    spawnFactoryGitZone,
    spawnCityZone,
    spawnChilloutZone,
    spawnSwimmingZone,
  ];
  var enemyList = [enemy, enemy2, enemy3, enemy4, enemy5];
  var enemyKillZoneList = [
    enemyKillZone,
    enemyKillZone2,
    enemyKillZone3,
    enemyKillZone4,
    enemyKillZone5,
  ];
  var clouds = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7];

  /*      INIT       */
  // --------------- //
  /**
   * init the game
   *
   * @return {void} [
   */
  function init() {}

  var xControl = 100;
  var yControl = 100;
  var lastRender = Date.now();

  /*    GAME LOOP    */
  // --------------- //

  /**
   * infinite game loop
   *
   * @return {void}
   */
  function gameLoop() {
    // ask name of player if make an high score
    if (hightScore != undefined) {
      if (score >= hightScore[0]) {
        if (playerName == undefined) {
          askName();
        }
        hightScore[0] = score;
        bestPlayer[0] = playerName;
        socket.emit("newsResponse", {
          newhighscore: hightScore,
          playerName: bestPlayer,
        });
      } else if (score >= hightScore[1]) {
        if (playerName == undefined) {
          askName();
        }
        hightScore[1] = score;
        bestPlayer[1] = playerName;
        socket.emit("newsResponse", {
          newhighscore: hightScore,
          playerName: bestPlayer,
        });
      } else if (score >= hightScore[2]) {
        if (playerName == undefined) {
          askName();
        }
        hightScore[2] = score;
        bestPlayer[2] = playerName;
        socket.emit("newsResponse", {
          newhighscore: hightScore,
          playerName: bestPlayer,
        });
      }
    }

    // clear the canvas each boucle cycle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNbPlayer("black");

    // update score
    drawScore(enemyList);

    // help info
    drawHelpInfo("black");

    // level
    drawLevel("black");
    drawHightScore("black");
    if (newMsg == true) {
      drawNewScore("black");
    }

    if (dammage == true) {
      drawDammage("black");
      tickDammage++;
    }
    if (tickDammage > maxDammage) {
      dammage = false;
      tickDammage = 0;
    }

    // modify life sensibility when equip with the shield
    if (equip == true) {
      maxLifeFirstTick = shieldOption;
    } else {
      maxLifeFirstTick = initFirstTick;
    }

    // life>>
    lifeUpdate(lifeZone);
    lifeHeart.draw();
    lifeSpawn();
    lifeIncrease();
    levelUp();

    // element under link
    mosaicGit.draw();
    pave.draw();
    swimmingPool.draw();
    swimmingPoolAnimateBubble.draw();
    animateSwimmingPool();
    drawObjects(herbs);
    sewer.draw();
    sewer2.draw();
    extinguisher.draw();

    // dev>>
    // drawZone(swordZone);
    // drawZone(lifeZone);
    // drawZone(enemyKillZone);
    // drawZone(enemyKillZone2);
    // drawZone(enemyKillZone3);
    // drawZone(enemyKillZone4);
    // drawZone(enemyKillZone5);

    // update link boxes
    swordZone.posX =
      link.posX + link.width / link.numberOfFrames / 2 - swordOffsetX;
    swordZone.posY = link.posY + link.height / 2 - swordOffsetY;
    lifeZone.posX =
      link.posX + link.width / link.numberOfFrames / 2 - lifeOffsetX;
    lifeZone.posY = link.posY + link.height / 2 - lifeOffsetY;

    enemyMove(enemyList);

    // spawn enemy if dead
    for (var i = 0; i < enemyList.length; i++) {
      if (enemyList[i].dead == true) {
        spawn(enemyList[i]);
      }
      enemyList[i].update();
      enemyList[i].render();
    }

    // update enemyKillZone
    for (var i = 0; i < enemyKillZoneList.length; i++) {
      enemyKillZoneList[i].posX = enemyList[i].posX + killZoneX;
      enemyKillZoneList[i].posY = enemyList[i].posY + killZoneY;
    }

    // update link info
    link.update();
    link.render();
    linkedin.draw();
    truck.draw();
    house.draw();
    factoryGit.draw();
    chillout.draw();
    city.draw();
    bubbleRoom.draw();

    // time management
    timeCount++;
    timeStartCount++;
    tickSwimmingPool++;
    tickHeart++;

    if (heartVisible == true) {
      heartDelay++;
    }
    welcomeBubble.draw();
    // statics animations
    animateCloud(clouds, 7, 1);
    animateStart(startBubble, 45, 7);

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
    }

    // help menu
    if (help == true) {
      helpBubble.draw();
    }
    checkLoose();
    // requestAnimFrame(gameLoop);
    window.requestAnimationFrame(gameLoop);
  }

  /* MAIN */
  init();
  gameLoop();

  /*   GAME CONTROL  */
  // --------------- //
  $(document).ready(function () {
    var tickPerFrameIncrease = 6;
    var speedIncrease = 6;
    // mouse clickable zones
    $(document).mousedown(function (e) {
      var mouse = {
        posX: parseInt(e.clientX),
        posY: parseInt(e.clientY),
        width: 1,
        height: 1,
      };
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
    });

    // MULTIPLE KEY LISTENER
    var map = {
      37: false,
      38: false,
      39: false,
      40: false,
      83: false,
      69: false,
      88: false,
      72: false,
      65: false,
      81: false,
      13: false,
    };
    $(document)
      .keydown(function (e) {
        if (e.keyCode in map) {
          map[e.keyCode] = true;

          // MOVE -------------------------------------
          // left
          if (map[37]) {
            left = true;

            if (map[37] && map[69]) {
              if (zoneDetection(link, swimmingPool)) {
                link.image = "img/left_swim.png";
              } else {
                link.numberOfFrames = 7;
                link.width = 270;
                link.image = "img/left_sword.png";
                checkEnemyLife();
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
            keyPush = true;
            link.updateImage();
          }
          // right
          if (map[39]) {
            right = true;

            if (map[39] && map[69]) {
              if (zoneDetection(link, swimmingPool)) {
                link.image = "img/right_swim.png";
              } else {
                link.numberOfFrames = 7;
                link.width = 270;
                link.image = "img/right_sword.png";
                checkEnemyLife();
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
            keyPush = true;
            link.updateImage();
          }

          // up
          if (map[38]) {
            up = true;

            if (map[38] && map[69]) {
              if (zoneDetection(link, swimmingPool)) {
                link.image = "img/left_swim.png";
              } else {
                link.numberOfFrames = 7;
                link.width = 270;
                link.image = "img/up_sword.png";
                checkEnemyLife();
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
            keyPush = true;
            link.updateImage();
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
                checkEnemyLife();
              }
            }
            if (map[40] && map[83]) {
              link.speed = speedIncrease;
              link.ticksPerFrame = tickPerFrameIncrease;
            }
            link.direction = "down";
            outOfZone(link);
            if (zoneDetection(link, swimmingPool)) {
              link.image = "img/down_swim.png";
              ``;
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
            keyPush = true;
            link.updateImage();
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
              } else if (down == true) {
                link.image = "img/down_sword.png";
              } else if (up == true) {
                link.image = "img/up_sword.png";
              }
              checkEnemyLife();
              cutCheck(herbs);
            }
            keyPush = true;
            link.updateImage();
          }

          // ACTION ------------------------------
          if (map[88]) {
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
          if (map[13]) {
            if (link.dead == true) {
              location.reload();
            }
          }
          // help bubble
          if (map[72]) {
            if (help == false) {
              help = true;
            } else {
              help = false;
            }
          }
        }
      })
      .keyup(function (e) {
        keyPush = false;
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
              link.image = "img/right_shield_static.png";
            } else if (left == true) {
              link.image = "img/left_shield_static.png";
            } else if (up == true) {
              link.image = "img/up_shield_static.png";
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
        link.updateImage();
      });
  });
})();
