//--------------------------------------------own code addition, referenced from playbackButton
function FullscreenButton(){

	this.x = 55;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	this.draw = function(){

		stroke(255);
		strokeWeight(2);
		noFill();

		//top-left corner
		line(this.x, this.y, this.x + 6, this.y);
		line(this.x, this.y, this.x, this.y + 6);

		//top-right corner
		line(this.x + this.width - 6, this.y,
			 this.x + this.width, this.y);
		line(this.x + this.width, this.y,
			 this.x + this.width, this.y + 6);

		//bottom-left corner
		line(this.x, this.y + this.height - 6,
			 this.x, this.y + this.height);
		line(this.x, this.y + this.height,
			 this.x + 6, this.y + this.height);

		//bottom-right corner
		line(this.x + this.width - 6, this.y + this.height,
			 this.x + this.width, this.y + this.height);
		line(this.x + this.width, this.y + this.height - 6,
			 this.x + this.width, this.y + this.height);
	};

	//checks whether the fullscreen button has been clicked.
	//@returns true if clicked, false otherwise.
	this.hitCheck = function(){

		if(mouseX > this.x &&
		   mouseX < this.x + this.width &&
		   mouseY > this.y &&
		   mouseY < this.y + this.height){

			var fs = fullscreen();
			fullscreen(!fs);

			return true;
		}

		return false;
	};
}
