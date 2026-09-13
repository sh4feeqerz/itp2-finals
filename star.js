function Star(angle, orbitRadius, starSize) {

    // Private properties storing the star's 3D position
    var x = cos(angle) * orbitRadius;
    var y = random(
        -orbitRadius * 0.12,
        orbitRadius * 0.12
    );
    var z = sin(angle) * orbitRadius;

    var size = starSize;

    // Public method to draw the star
    this.draw = function(focalLength) {

        /*
         * Convert the star's 3D position into a position
         * on the 2D canvas.
         */
        var perspective =
            focalLength / (focalLength + z);

        var screenX =
            width / 2 + x * perspective;

        var screenY =
            height / 2 + y * perspective;

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