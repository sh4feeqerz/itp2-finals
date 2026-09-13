function Stars() {
    this.name = "Star System";

    var stars = [];

    var focalLength = 500;

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

        // Draw every star in the array
        for (var i = 0; i < stars.length; i++) {
            stars[i].draw(focalLength);
        }

        // Temporary centre point
        noStroke();
        fill(255);
        ellipse(width / 2, height / 2, 20);

        pop();
    };
}

/* End - own code */