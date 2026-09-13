function DetectTransients() { //-------------------------------------------adapted from BeatDetect in coursera

    // Store the recent spectrum-energy values
    var sampleBuffer = [];

    /*
     * Public method that compares the current spectrum
     * against the recent average.
     */
    this.detectTransient = function(spectrum) {

        var isTransient = false;
        var sum = 0;

        /*
         * Calculate the total energy of the current
         * spectrum. Squaring each value creates a larger
         * difference between quiet and loud values.
         */
        for (var i = 0; i < spectrum.length; i++) {
            sum += spectrum[i] * spectrum[i];
        }

        /*
         * At 60 frames per second, a buffer of 60 values
         * stores approximately one second of audio history.
         */
        if (sampleBuffer.length == 60) {

            var sampleSum = 0;

            // Add together the values in the sample buffer
            for (var i = 0; i < sampleBuffer.length; i++) {
                sampleSum += sampleBuffer[i];
            }

            // Calculate the average recent energy
            var sampleAverage =
                sampleSum / sampleBuffer.length;

            /*
             * The current energy must be 10% greater than
             * the recent average to count as a transient.
             */
            var c = 1.1;

            if (sum > sampleAverage * c) {
                isTransient = true;
            }

            // Remove the oldest value from the buffer
            sampleBuffer.splice(0, 1);
        }

        // Add the newest value to the buffer
        sampleBuffer.push(sum);

        return isTransient;
    };
}

/* End - code adapted from CM1010 course material */