// Constructor function representing one star
function Star(angle, orbitRadius, starSize, orbitSpeed) {

    // Private properties storing the star's 3D position
    var x = cos(angle) * orbitRadius;

    var y = random(-orbitRadius * 0.12, orbitRadius * 0.12 );

    var z = sin(angle) * orbitRadius;

    var size = starSize;
    var speed = orbitSpeed;
    // Temporary displacement created by a transient
    var joltX = 0;
    var joltY = 0;

    /*
     * Private method that rotates the star around
     * the centre of the star system.
     */
    function update() {

        /*
         * Store the new coordinates temporarily.
         * Both calculations must use the old x and z values.
         */
        var newX = x * cos(speed) - z * sin(speed);

        var newZ = x * sin(speed) + z * cos(speed);

        x = newX;
        z = newZ;

        /*
        * Gradually return the temporary displacement to zero.
        */
        joltX *= 0.75;
        joltY *= 0.75;
    }

    /*
    * Public method that gives the star a temporary
    * random displacement when a transient is detected.
    */
    this.jolt = function(strength) {
        joltX = random(-strength, strength);
        joltY = random(-strength, strength);
    };

    // Public method to update and draw the star
    this.draw = function(focalLength) {

        update();

        /*
         * Convert the star's 3D position into a position
         * on the 2D canvas.
         */
        var perspective =
            focalLength / (focalLength + z);

        var screenX = width / 2 + x * perspective + joltX;

        var screenY = height / 2 + y * perspective + joltY;

        // Stars closer to the viewer appear larger
        var displaySize = size * perspective;

        // Stars closer to the viewer appear brighter
        var brightness = map(
            z,
            -orbitRadius,
            orbitRadius,
            255,
            80
        );

        brightness = constrain(
            brightness,
            80,
            255
        );

        noStroke();
        fill(brightness);

        ellipse(
            screenX,
            screenY,
            displaySize
        );
    };
}

