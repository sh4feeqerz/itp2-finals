function Stars() {
    this.name = "Star System";

    var stars = [];

    var focalLength = 500;

    for (var i = 0; i < 180; i++) {
        var angle = random(TWO_PI);
        var orbitRadius = random(50, min(width, height) * 0.4);
        var starSize = random(1.5, 4);

        stars.push(
            new Star(angle, orbitRadius, starSize)
        );
    }

    this.draw = function() {
        push();

        background(0);

        for (var i = 0; i < stars.length; i++) {
            stars[i].draw(focalLength);
        }

        noStroke();
        fill(255);
        ellipse(width / 2, height / 2, 20);

        pop();
    };
}
