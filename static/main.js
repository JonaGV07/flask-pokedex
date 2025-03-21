const URL = 'https://flask-pokedex.onrender.com/api/pokemon/';  // Asegúrate de que apunta al backend en Render

const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');

function showError(message) {
    pokedexContainer.innerHTML = `<p style="color:red;">${message}</p>`;
}

async function searchPokemon() {
    const searchedPokemon = searchInput.value.toLowerCase();
    console.log("Buscando Pokémon:", searchedPokemon);

    try {
        const response = await fetch(URL + searchedPokemon);
        if (!response.ok) {
            showError(`No se encontró el Pokémon "${searchedPokemon}"`);
            return;
        }

        const data = await response.json();
        
        let tipos = data.types.map(type => 
            `<span class="tipo ${type}">${type.toUpperCase()}</span>`).join(' ');

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
        showError('Error al buscar el Pokémon');
        console.error(error);
    }
}
