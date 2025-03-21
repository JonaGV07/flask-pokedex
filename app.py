from flask import Flask, jsonify, request, render_template
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Evita problemas de CORS en el navegador

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/pokemon/<name>', methods=['GET'])
def get_pokemon(name):
    pokeapi_url = f"https://pokeapi.co/api/v2/pokemon/{name}"
    response = requests.get(pokeapi_url)

    if response.ok:
        return jsonify(response.json())  # Retorna la respuesta de PokeAPI
    else:
        return jsonify({"error": "Pokemon not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
