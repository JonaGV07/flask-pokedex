const URL = '/api/pokemon/';  // URL del backend Flask

const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedexContainer.innerHTML = `<p style="color:red;">${message}</p>`;
}

// Función para buscar un Pokémon
async function searchPokemon() {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const searchedPokemon = searchInput.value.toLowerCase();

    try {
        // Realizar una petición a la API de PokeAPI con el nombre del Pokémon
        const response = await fetch(URL + searchedPokemon);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró el Pokémon "${searchedPokemon}"`);
            return;
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        let tipos = data.types.map(type => 
            `<span class="tipo ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join(' ');

        // Mostrar los datos del Pokémon en el contenedor de resultados
        pokedexContainer.innerHTML = 
        `
        <div class="pokemon-card">
            <p class="pokemon-id-back">#${String(data.id).padStart(3, '0')}</p>
            <img class="pokemon-img" src="${data.sprites.front_default}" alt="${data.name}">
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
        // Si ocurre algún error durante la petición, mostrar un mensaje de error
        showError('Error al buscar el Pokémon');
        console.error(error);
    }
}
