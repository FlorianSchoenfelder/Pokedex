let mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let links = [];
let loadBeginning = 30;

async function init() {
    await loadpokemonApi();
    renderPokemonUrls(); // Rufe die Funktion zum Rendern der Pokemon-URLs auf, nachdem alle URLs geladen wurden
}

async function loadpokemonApi() {
    let url = mainUrl + `?limit=${loadBeginning}&offset=0`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    console.log(responseAsJson['results']);

    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        links.push(element['url']); // Speichere nur die URL in der links-Liste
    }    
}

async function renderPokemonUrls() {
    document.getElementById('mainContainer').innerHTML = '';
    for (let j = 0; j < links.length; j++) {
        const url = links[j];
        let response = await fetch(url);
        let pokemonData = await response.json();
        let type1 = pokemonData['types']['0']['type']['name'];
        
        let pokemonName = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1)
        console.log(pokemonData);

        document.getElementById('mainContainer').innerHTML += /*html*/`
            <div class="pokemon" id="pokemon_${j}">
                <div class="information">
                    <div class="name">${pokemonName}</div>
                    <div class="mainInformation">
                        <span>
                            #${pokemonData['id']} <br>
                            ${pokemonData['weight']}Kg <br>
                            ${type1}
                        </span>
                    </div>
                </div>
                <div class="pokemonImageContainer">
                    <img class="pokemonImage" src="${pokemonData['sprites']['other']['official-artwork']['front_default']}">
                </div>
                
            </div>
        `;

        await selectBackground(type1, j);
    }

    document.getElementById('mainContainer').innerHTML += /*html*/`
        <div class="buttonContainer">
            <button class="moreButton" onclick="loadMorePokemons()">Load More</button>
        </div>
        
    `;
}

function loadMorePokemons() {
    loadBeginning += 30;
    init();
}

function selectBackground(type1, index) {
    let pokemonElement = document.getElementById('pokemon_' + index);

    if (type1 == 'grass') {
        pokemonElement.classList.add('grassBackground');
    }
    if (type1 == 'fire') {
        pokemonElement.classList.add('fireBackground');
    }
    if (type1 == 'water') {
        pokemonElement.classList.add('waterBackground');
    }
    if (type1 == 'bug') {
        pokemonElement.classList.add('bugBackground');
    }
    if (type1 == 'normal') {
        pokemonElement.classList.add('normalBackground');
    }
    if (type1 == 'poison') {
        pokemonElement.classList.add('poisonBackground');
    }
    if (type1 == 'electric') {
        pokemonElement.classList.add('electricBackground');
    }
    if (type1 == 'ground') {
        pokemonElement.classList.add('groundBackground');
    }
    if (type1 == 'fairy') {
        pokemonElement.classList.add('fairyBackground');
    }
    if (type1 == 'psychic') {
        pokemonElement.classList.add('psychicBackground');
    }
    if (type1 == 'rock') {
        pokemonElement.classList.add('rockBackground');
    }
    if (type1 == 'ghost') {
        pokemonElement.classList.add('ghostBackground');
    }
}