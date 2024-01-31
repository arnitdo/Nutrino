from flask import Flask, request, jsonify
import cv2
import easyocr
import numpy as np

app = Flask(__name__)
reader = easyocr.Reader(['en'], gpu=False)

def process_image(image_path):
    import os
    img = cv2.imread(image_path)
    result = reader.readtext(img)

    recognized_text = []
    for detection in result:
        text = detection[1]
        recognized_text.append(text)

    os.remove(image_path)

    return recognized_text

@app.route('/ocr', methods=['POST'])
def ocr():
    try:
        file = request.files['image']
        file.save('temp_image.jpg') 

        result = process_image('temp_image.jpg')

        response = {
            'success': True,
            'text': result
        }

    except Exception as e:
        response = {
            'success': False,
            'error': str(e)
        }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
