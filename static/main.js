const URL = 'https://flask-pokedex.onrender.com/api/pokemon/';  

const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');

function showError(message) {
    pokedexContainer.innerHTML = `<p style="color:red;">${message}</p>`;
}

async function searchPokemon() {
    const searchedPokemon = searchInput.value.trim().toLowerCase();
    
    if (!searchedPokemon) {
        showError("Por favor, ingresa un nombre o ID de Pokémon.");
        return;
    }

    const fullUrl = `${URL}${searchedPokemon}`;
    console.log("Buscando en:", fullUrl);  // Log para verificar la URL

    try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
            const errorText = await response.text(); // Obtener mensaje de error de la API
            console.error("Error en API:", errorText);
            showError(`No se encontró el Pokémon "${searchedPokemon}"`);
            return;
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);  // Verifica los datos recibidos

        // Corregir el acceso a los tipos
        let tipos = data.types.map(type => 
            `<span class="tipo ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join(' ');

        pokedexContainer.innerHTML = 
        `
        <div class="pokemon-card">
            <p class="pokemon-id-back">#${String(data.id).padStart(3, '0')}</p>
            <img class="pokemon-img" src="${data.sprite}" alt="${data.name}">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${data.id}</p>
                <h2 class="pokemon-name">${data.name.toUpperCase()}</h2>
            </div>
            <div class="pokemon-types">${tipos}</div>
            <div class="pokemon-info">
                <p class="stat">${data.height / 10}M</p>
                <p class="stat">${data.weight / 10}KG</p>
            </div>
        </div>
        `;
    } catch (error) {
        console.error("Error en fetch:", error);
        showError('Error al buscar el Pokémon. Revisa la consola.');
    }
}

