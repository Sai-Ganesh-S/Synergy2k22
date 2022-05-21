import cv2
import numpy as np

v = cv2.VideoCapture(0)

while True:
    ret, frame = v.read()
    cv2.imshow('window', frame)

    if cv2.waitKey(3) == ord('q'):
        break


v.release()
cv2.destroyAllWindows()
