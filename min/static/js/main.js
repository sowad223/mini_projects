document.addEventListener('DOMContentLoaded', function () {
    let video = document.getElementById('videoElement');
    let canvas = document.getElementById('canvasElement');
    let context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error('Error accessing webcam: ' + err);
        });

    video.addEventListener('play', function () {
        const FPS = 30;
        let frameCount = 0;

        // Load OpenCV.js and initialize variables for hand detection
        cv['onRuntimeInitialized'] = () => {
            console.log('OpenCV.js is ready');
            let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            let gray = new cv.Mat();
            let cap = new cv.VideoCapture(video);

            setInterval(() => {
                cap.read(src);
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
                cv.imshow('canvasElement', src);  // Display video feed

                // Example hand detection logic
                let contours = new cv.MatVector();
                let hierarchy = new cv.Mat();
                cv.findContours(gray, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                for (let i = 0; i < contours.size(); ++i) {
                    let rect = cv.boundingRect(contours.get(i));
                    cv.rectangle(src, rect, new cv.Scalar(255, 0, 0), 2);

                    // Perform action based on hand position or gesture
                    // Example: Check if hand is near a button
                    let buttonClicked = checkButtonClicked(rect.x, rect.y);
                    if (buttonClicked !== '') {
                        buttonClick(buttonClicked);
                    }
                }

                // Cleanup
                contours.delete(); hierarchy.delete();

            }, 1000 / FPS);  // Adjust frame rate as needed

        };
    });

    function checkButtonClicked(x, y) {
        // Example logic to check if a hand (at position x, y) is near a button
        // Adapt this function based on your button positions and hand detection accuracy
        let buttons = document.getElementsByClassName('btn');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            let rect = button.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return button.innerHTML.trim();  // Return button text if hand is near it
            }
        }
        return '';
    }

    function buttonClick(value) {
        // Handle button clicks and update calculator display
        let output = document.getElementById('output');
        let currentOutput = output.innerHTML.trim();

        if (value === 'C') {
            output.innerHTML = '0';
        } else if (value === '=') {
            try {
                output.innerHTML = eval(currentOutput);
            } catch (e) {
                output.innerHTML = 'Error';
            }
        } else if (value === 'del') {
            output.innerHTML = currentOutput.slice(0, -1);
        } else {
            if (currentOutput === '0') {
                output.innerHTML = value;
            } else {
                output.innerHTML += value;
            }
        }
    }
});
