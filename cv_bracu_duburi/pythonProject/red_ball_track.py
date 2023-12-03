import cv2
import numpy as np

# create a Function to detect and draw a square box around the red ball
def detect_red_ball(image):
    # now i will Convert the image from BGR to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # we must Define the lower and upper bounds of the red color in HSV
    lower_red = np.array([0, 100, 100])
    upper_red = np.array([10, 255, 255])

    # Create a mask using the inRange function to filter out the red color
    mask = cv2.inRange(hsv, lower_red, upper_red)

    # Find contours in the mask
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Checking if contours are found
    if contours:
        # Get the largest contour (assuming the red ball is the largest red object)
        largest_contour = max(contours, key=cv2.contourArea)

        # Get the bounding box around the red ball
        x, y, w, h = cv2.boundingRect(largest_contour)

        # Draw a rectangle around the red ball
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Calculating the center coordinates of the rectangle
        center = (int(x + w / 2), int(y + h / 2))

        # Displaying the center coordinates on the screen
        cv2.putText(image, f"Center: {center}", (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 200, 0), 2)

    return image

# Read the input image
image_path = "image/bounce.jpeg"
image = cv2.imread(image_path)

# Call the function to detect and draw the red ball
result_image = detect_red_ball(image)

# Display the original and result images

cv2.imshow("Result Image", result_image)

# Wait for a key press and close the windows
cv2.waitKey(0)
cv2.destroyAllWindows()
