import requests

url = "http://127.0.0.1:5000/recipemaker"
headers = {"Content-Type": "application/json"}
data = {"food_to_include": "eggs bacon strawberry", "food_to_exclude": "banana"}

response = requests.post(url, json=data, headers=headers)

print(response.json())