function Star(angle, orbitRadius, starSize, orbitSpeed) {


    //----------------------------------------------------------------------- because its 3D, stars have XYZ
    var x = cos(angle) * orbitRadius;
    var y = random(-orbitRadius * 0.12, orbitRadius * 0.12 );
    var z = sin(angle) * orbitRadius;

    var size = starSize;
    var speed = orbitSpeed;

    //-----------------------------------------------------------------------transients cause stars to shake/jolt aound
    var joltX = 0;
    var joltY = 0;

    //-----------------------------------------------------------------------rotating the surrounding stars around the central star
    this.update = function(speedMultiplier) {

        var currentSpeed = speed * speedMultiplier;

        //-------------------------------------------------------------------------calculations to similate 3D movement of surrounding stars
        var newX = x * cos(currentSpeed) - z * sin(currentSpeed);
        var newZ = x * sin(currentSpeed) + z * cos(currentSpeed);

        x = newX;
        z = newZ;

        //------------------------------------------returns XY to zero, or else
        joltX *= 0.4;
        joltY *= 0.4;
    };

    /*
    * Public method that gives the star a temporary
    * random displacement when a transient is detected.
    */
    this.jolt = function(strength) {
        joltX = random(-strength, strength);
        joltY = random(-strength, strength);
    };

    /*
    * Return true when the star is on the far
    * side of the central star.
    */
    this.isBehind = function() {
        return z > 0;
    };

    // Public method to update and draw the star
    this.draw = function(focalLength) {
        /*
         * Convert the star's 3D position into a position
         * on the 2D canvas.
         */
        var perspective =
            focalLength / (focalLength + z);

        var screenX = width / 2 + x * perspective + joltX;

        var screenY = height / 2 + y * perspective + joltY;

        // Stars closer to the viewer appear larger
        var displaySize = size * perspective *1.2;

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

