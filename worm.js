
//-------------------- own code, mid term extension on coursera slides : Moving Worm Visualiser


function Worm (){
    this.name = "worm";

    this.noiseAmount = 0.01;

    this.numberOfBlocks = 16;

    this.rotationSpeed = 0.01;

    var prog = 0;
    var blockRotation = 0;
    var amplitude = new p5.Amplitude();

    noFill();
    stroke(0,255,255);
    strokeWeight(3);
    this.draw = function(){
        push();

        fourier.analyze();
        var level = amplitude.getLevel();
        var highEnergy = fourier.getEnergy("highMid");
        var lowEnergy = fourier.getEnergy("lowMid");


        noStroke();

        fill(getVolumeColor(lowEnergy));        //change colour of ellipse according to frequency volume
        ellipse(width/5*4, height/2, 100);

        fill(getVolumeColor(highEnergy));       //change colour of ellipse according to frequency volume
        ellipse(width/5, height/2, 100);

        push();
        translate(width/2, height/2);
        noFill();
        stroke(0,0,255);
        strokeWeight(3);
        beginShape();
        for(var i =0; i < 100; i++){

            var x = map(noise(i * this.noiseAmount + prog),0,1,-250,250);
            var y = map(noise(i * this.noiseAmount + prog + 1000),0,1,-250,250);
            vertex(x,y);

        }
        endShape();

        if(level > 0.05 ){
            prog += 0.05 ;
        }
        else {
            prog += 0.005;
        }
        pop();

        blockRotation += this.rotationSpeed;

        rotatingBlocks( width /5, height/2, blockRotation, lowEnergy, this.numberOfBlocks);                 //saturn ring around ellipse

        rotatingBlocks( width /5*4, height/2, -blockRotation, highEnergy, this.numberOfBlocks);              //saturn ring around ellipse


        pop();
    }

    function rotatingBlocks( centerX, centerY, rotation, energy, numberOfBlocks){       //saturn ring function
        
        var ringRadius = 60;
        var blockThickness = 15;
        var blockHeight = map(energy, 0, 255,5,80);             //give the saturn ring visualiser its height

        push();

        rectMode(CORNER);
        noStroke();
        fill(255,255,255);

        translate (centerX, centerY);
        rotate(rotation);

        for (var i = 0; i < numberOfBlocks; i++) {
            push();

            var angle = map (i, 0, numberOfBlocks,0,TWO_PI);

            rotate(angle);                                          // spread blocks around ring
            translate (ringRadius , -blockThickness /2 );
            rect(0, 0, blockHeight, blockThickness );

            pop();
        }

        pop();
    }

    function getVolumeColor(energy){

        var base = color(255,255,255);
        var cyan = color(255,255,255);
        var green = color(0,255,0);
        var orange = color(255,150,0);
        var red = color(255,0,0);


        if (energy < 1) {
            var amount = map(energy, 0, 1, 0, 1);

            return lerpColor(
                base,
                cyan,
                amount
            );
        }

        else if (energy < 80) {                          //low volume cyan to green
            var amount = map(energy, 0, 85, 0, 1);

            return lerpColor(
                cyan,
                green,
                amount
            );
        }

        else if (energy < 160) {                    //mid volume green to orange 
            var amount = map(energy, 85, 170, 0, 1);

            return lerpColor(
                green,
                orange,
                amount
            );
        }

        else {                                      //high volume orange to red
            var amount = map(energy, 170, 255, 0, 1);

            return lerpColor(
                orange,
                red,
                amount
            );
        }
    }


}