function Stars() {
    this.name = "StarSystem";

    var stars = [];

    var focalLength = 500;

    //--------------------------------------------------------------------adapted  from coursera BeatDetector and improved upon
    var transientDetector = new DetectTransients();

    for (var i = 0; i < 180; i++) {
        var angle = random(TWO_PI);
        var orbitRadius = random(50, min(width, height) * 0.4);

        var starSize = random(1.5, 4);

        var orbitSpeed = map(
            orbitRadius,
            50, min(width, height) * 0.4,
            0.012, 0.003
        );

        stars.push(
            new Star(angle, orbitRadius, starSize, orbitSpeed)
        );
    }

    this.draw = function() {
        push();

        background(0);

        var spectrum = fourier.analyze();

        var bassEnergy = fourier.getEnergy("bass");

        var lowMidEnergy = fourier.getEnergy("lowMid");

        var speedMultiplier = map(
            lowMidEnergy, 
            0, 255,
            0.5, 2.5
        );

        drawCore(bassEnergy);

        //----------------------------------------------------------------detects trasients in the music and triggers jolt in surrounding stars
        if (transientDetector.detectTransient(spectrum)) {

            for (var i = 0; i < stars.length; i++) {
                stars[i].jolt(20);
            }
        }

        for (var i = 0; i < stars.length; i++) {
            stars[i].update(speedMultiplier);
        }

        //------------------------------------------------------------------to draw stars that go behind the center star
        for (var i = 0; i < stars.length; i++) {

            if (stars[i].isBehind()) {
                stars[i].draw(focalLength);
            }
        }

        //--------------------------------------------------------------------drawing center core star
        drawCore(bassEnergy);

        //-------------------------------------------------------------------drawing stars that are go in front of center star
        for (var i = 0; i < stars.length; i++) {

            if (!stars[i].isBehind()) {
                stars[i].draw(focalLength);
            }
        }

        pop();
    };

    //------------------------------------------------------controlling the center core star to react to bass
    function drawCore(bassEnergy) {

        var coreSize = map(
            bassEnergy,
            0, 255,
            15, 80
        );

        //----------------------------------------------------------------for the center star to change color according to bass
        var greenValue = map(
            bassEnergy,
            0, 255,
            255, 180
        );

        var blueValue = map(
            bassEnergy,
            0, 255,
            220, 0
        );

        noStroke();

        fill(0);

        //-------------------------------------------------------drawing center core star
        ellipse(
            width / 2, height / 2, coreSize * 2.5
        );

        //----------------------------------outer
        fill(
            255, greenValue, blueValue, 35
        );

        ellipse(
            width / 2, height / 2, coreSize * 2.5
        );

        //-----------------------------------middle glow
        fill(
            255, greenValue, blueValue, 80
        );

        ellipse(
            width / 2, height / 2, coreSize * 1.6
        );

        //----------------------------------------solid core
        fill(
            255, greenValue, blueValue
        );

        ellipse(
            width / 2, height / 2, coreSize
        );
    }
}
