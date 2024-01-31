from flask import Flask, request, jsonify
import cv2
import easyocr
import numpy as np
import google.generativeai as genai
import PIL
from flask_cors import CORS

genai.configure(api_key="AIzaSyAMBoESvU1tZn_3U1eWtp_9HRDbVf3XQ5c")

app = Flask(__name__)
CORS(app)
reader = easyocr.Reader(['en'], gpu=False)

@app.route('/ingredientsfetch', methods=['POST'])
def ingredientsfetch():
    try:
        import os
        import ast
        res = ""
        with open('ingredients.json', 'r') as file:
            data = ast.literal_eval(file.read())
        for i in data:
            res += i + " "
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        prompt = "Extract all the food ingredients from the following text without any special characters or numbers just , as the separator between ingredients which are in" + res
        result = model.generate_content([prompt,img],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/geminiocr', methods=['POST'])
def geminiocr():
    try:
        import os
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        result = model.generate_content([img,"Extract all the food ingredients from the image without any special characters or numbers just , as the separator between ingredients"],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
