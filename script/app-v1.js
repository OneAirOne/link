(function() {

	var link,
		linkImage,
		canvas


	function sprite (options) {

		var that = {};

		that.context = options.context;
		// that.width = options.width;
		// that.height = options.height;
		that.image = options.image;



		that.render = function () {
			console.log(that.image);
			// Draw image
			that.context.drawImage(that.image, 0,0);
			// that.context.drawImage(
			// 	that.image,
			// 	0,
			// 	0,
			// 	that.width,
			// 	that.height,
			// 	0,
			// 	0,
			// 	that.width,
			// 	that.height);
		};

		return that;
	};

	// Get canvas
	canvas = document.getElementById('link');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// create sprite sheet
	linkImage = new Image();


	link = sprite({
		context : canvas.getContext('2d'),
		// width   : 19,
		// height	: 24,
		image   :	linkImage

	});

	// load sprite sheet
	linkImage.src = 'img/bas2.png';




	link.render();
})();
