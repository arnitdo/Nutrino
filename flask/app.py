from flask import Flask, request, jsonify
import cv2
import easyocr
import numpy as np
# from transformers import pipeline
import google.generativeai as genai
import PIL
from flask_cors import CORS

genai.configure(api_key="AIzaSyAMBoESvU1tZn_3U1eWtp_9HRDbVf3XQ5c")

app = Flask(__name__)
CORS(app)
reader = easyocr.Reader(['en'], gpu=False)

# def process_image(image_path):
#     import os
#     img = cv2.imread(image_path)
#     result = reader.readtext(img)

#     recognized_text = []
#     for detection in result:
#         text = detection[1]
#         recognized_text.append(text)

#     os.remove(image_path)

#     return recognized_text

# @app.route('/ocr', methods=['POST'])
# def ocr():
#     try:
#         file = request.files['image']
#         file.save('temp_image.jpg') 

#         result = process_image('temp_image.jpg')

#         response = {
#             'success': True,
#             'text': result
#         }

#     except Exception as e:
#         response = {
#             'success': False,
#             'error': str(e)
#         }
#     return jsonify(response)


# image_to_text_pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-large")

# @app.route('/imagecaptioning', methods=['POST'])
# def imagecaptioning():
#     try:
#         import os
#         image_file = request.files['image']
#         image_file.save("temp_image.jpg")
#         result = image_to_text_pipe("temp_image.jpg")
#         os.remove("temp_image.jpg")
#         return jsonify({'result': result[0]['generated_text']})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/geminiimagecaptioning', methods=['POST'])
# def geminiimagecaptioning():
#     try:
#         import os
#         image_file = request.files['image']
#         image_file.save("temp_image.jpg")
#         model = genai.GenerativeModel('gemini-pro-vision')
#         img = PIL.Image.open('temp_image.jpg')
#         result = model.generate_content(img)
#         result.resolve()
#         os.remove("temp_image.jpg")
#         return jsonify({'result': result.text})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/ingredientsfetch', methods=['POST'])
def ingredientsfetch():
    try:
        import os
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        result = model.generate_content(["Extract all the food ingredients from the following text : ",img],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

# @app.route('/recipemaker', methods=['POST'])
# def recipemaker():
#     try:
#         import os
#         food_to_include = request.get_json()['food_to_include']
#         food_to_exclude = request.get_json()['food_to_exclude']
#         model = genai.GenerativeModel('gemini-pro')
#         result = model.generate_content(["Give a detailed step by step recipe from ingredients without ",food_to_include," and without any ",food_to_exclude],stream=True)
#         result.resolve()
#         return jsonify({'result': result.text})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/geminiocr', methods=['POST'])
def geminiocr():
    try:
        import os
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        result = model.generate_content([img,"Extract all the food ingredients from the image"],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
