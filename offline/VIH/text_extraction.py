
from PIL import Image
from pytesseract import pytesseract

def image_to_string(image):

    img = Image.open(image)
    result = text.strip().lower().replace('\n', ' ')

    return result

def main():

    image_path = "handwritten.jpeg"
    print(image_to_string(image_path))


if __name__=='__main__':
    main()
