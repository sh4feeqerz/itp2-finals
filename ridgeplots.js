/*
    Extension 1 based on coursera slides: Ridge plot Visualiser
*/

function RidgePlot(){
    this.name = "ridgeplot";

    var output = [];
    var startX = width/5;
    var endY = height/5;
    var startY = height - endY;
    var spectrumWidth = (width/5)*3;
    var spectrumHeight = (height/5)*3
    var speed = 2;
    // var fourier = new p5.FFT();


    this.draw = function(){

        push(); 

        stroke(255);
        strokeWeight(2);
        noFill();
        if(frameCount % 5 == 0){
            this.addWave();
        }
        for (var i = 0 ; i < output.length; i++){
            var o = output[i];

            beginShape();
            for (var j = 0; j < o.length;j++){
                o[j].y -= speed;
                vertex(o[j].x, o[j].y);
            }
            endShape();

            if (o[0].y < endY){
                output.splice(i,1);
            }
        }
 
        pop();
    }
    this.addWave = function(){

        //output.push([{x:startX, y:startY}, {x:startX + spectrumWidth, y: startY}])
        var w = fourier.waveform();
        var output_wave =[];
        var smallScale = 3;
        var bigScale = 150 ;

        for (var i =0; i <w.length; i++){
            if (i %5 == 0){
                var x = map (i, 0, 1024, startX, startX + spectrumWidth);
                if ( i <1024 * 0.20 || i > 1025 * 0.80){
                    var y = map (w[i], -1, 1, -smallScale, smallScale);
                    output_wave.push({
                        x: x,
                        y: startY + y
                    })
                }
                else {
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    output_wave.push({
                        x:x,
                        y: startY + y
                    })
                }
            }
        }
        output.push(output_wave);
    }

} 

