import os
from flask import Flask, jsonify, request, render_template
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Evita problemas de CORS en el navegador

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/pokemon/<identifier>', methods=['GET'])
def get_pokemon(identifier):
    pokeapi_url = f"https://pokeapi.co/api/v2/pokemon/{identifier}"
    response = requests.get(pokeapi_url)

    if response.ok:
        return jsonify(response.json())  # Enviar TODO el JSON de PokeAPI
    else:
        return jsonify({"error": "Pokemon not found"}), 404
        
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))  # Render asigna el puerto dinámicamente
    app.run(host='0.0.0.0', port=port, debug=True)
