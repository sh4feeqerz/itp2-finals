function Stars() {
    this.name = "Star System";

    var stars = [];

    var focalLength = 500;

    // Detect sudden increases in the music's energy
    var transientDetector = new DetectTransients();

    for (var i = 0; i < 180; i++) {
        var angle = random(TWO_PI);
        var orbitRadius = random(
            50,
            min(width, height) * 0.4
        );

        var starSize = random(1.5, 4);

        var orbitSpeed = map(
            orbitRadius,
            50,
            min(width, height) * 0.4,
            0.012,
            0.003
        );

        stars.push(
            new Star(angle, orbitRadius, starSize, orbitSpeed)
        );
    }

    // Public draw method called by the visualisation container
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

        // Jolt the surrounding stars when a transient is detected
        if (transientDetector.detectTransient(spectrum)) {

            for (var i = 0; i < stars.length; i++) {
                stars[i].jolt(20);
            }
        }

        // Draw every star in the array
        for (var i = 0; i < stars.length; i++) {
            stars[i].draw(
                focalLength,
                speedMultiplier
            );
        }

        pop();
    };

    // Private function to draw the bass-reactive central star
    function drawCore(bassEnergy) {

        var coreSize = map(
            bassEnergy,
            0,
            255,
            15,
            80
        );

        noStroke();

        // Outer glow
        fill(80, 130, 255, 35);
        ellipse(
            width / 2,
            height / 2,
            coreSize * 2.5
        );

        // Middle glow
        fill(120, 180, 255, 80);
        ellipse(
            width / 2,
            height / 2,
            coreSize * 1.6
        );

        // Bright centre
        fill(255);
        ellipse(
            width / 2,
            height / 2,
            coreSize
        );
    }
}
