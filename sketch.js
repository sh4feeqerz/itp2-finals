var controls = null;
var vis = null;
var sound = null;
var fourier;

var worm;
var gui;

function preload(){
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	background(0);
	controls = new ControlsAndInput();

	fourier = new p5.FFT();

	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlot());

	worm = new Worm();
	vis.add(worm);
	
	vis.add(new Stars());

	//-------------------------------------------------creating gui for worm controls
	gui = createGui("Worm Controls");

	sliderRange(0.00, 1, 0.02);
	gui.addObject(worm, 'noiseAmount');

	sliderRange(4, 30, 1 );
	gui.addObject(worm, 'numberOfBlocks');

	sliderRange(0, 0.1, 0.001);
	gui.addObject(worm, 'rotationSpeed');


	gui.setPosition(0 + 20, height - 200);


}

function draw(){
	background(0);

	vis.selectedVisual.draw();

	//---------------------------------------------------------only show gui for worm
	if(vis.selectedVisual.name == "worm"){
		gui.show();
	}
	else{
		gui.hide();
	}

	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}


//-----------------------------------------------------------------for window resizing
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

