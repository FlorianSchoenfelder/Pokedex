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
        let pokemonName = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1)
        console.log(pokemonData);
        document.getElementById('mainContainer').innerHTML+= /*html*/`
            <div class="pokemon">
                <div class="information">
                    <div class="name">${pokemonName}</div>
                <div class="mainInformation">
                    <span>
                        #${pokemonData['id']} <br>
                        ${pokemonData['weight']}Kg
                        
                    </span>
                </div>
            </div>
                
                
                <img src="${pokemonData['sprites']['front_default']}" alt="">
            </div>  
        `;
    }
    document.getElementById('mainContainer').innerHTML += /*html*/`
        <button class="moreButton" onclick="loadMorePokemons()">Load More</button>
    `;
}

function loadMorePokemons() {
    loadBeginning += 30;
    init();
}