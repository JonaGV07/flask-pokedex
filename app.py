import os
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
        pokemon_data = response.json()

        # Extraer solo la información relevante
        result = {
            "id": pokemon_data["id"],
            "name": pokemon_data["name"],
            "height": pokemon_data["height"],
            "weight": pokemon_data["weight"],
            "types": [t["type"]["name"] for t in pokemon_data["types"]],
            "sprite": pokemon_data["sprites"]["front_default"]
        }
        return jsonify(result)  # Respuesta limpia para el frontend
    else:
        return jsonify({"error": "Pokemon not found"}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))  # Render asigna el puerto dinámicamente
    app.run(host='0.0.0.0', port=port, debug=True)
