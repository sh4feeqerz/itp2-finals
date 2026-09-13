//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

var worm;
var gui;

function preload(){
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlot());

	worm = new Worm();
	vis.add(worm);
	
	vis.add(new Stars());

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
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

