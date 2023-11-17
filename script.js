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

    // console.log(responseAsJson['results']);

    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        links.push(element['url']); // Speichere nur die URL in der links-Liste
    }
}

async function renderPokemonUrls() {
    document.getElementById('mainContainer').classList.add('animateIn');
    document.getElementById('showPokemon').classList.add('d-none');
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('backgroundContainer').classList.remove('d-none');
    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('mainContainer').innerHTML = '';
    for (let j = 0; j < links.length; j++) {
        const url = links[j];
        let response = await fetch(url);
        let pokemonData = await response.json();
        let type1 = pokemonData['types']['0']['type']['name'];

        let pokemonName = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1);
        // console.log(pokemonData);

        document.getElementById('mainContainer').innerHTML += /*html*/`
            <div class="pokemon" id="pokemon_${j}" onclick="showPokemon(${j})">
                <div class="information">
                    <div class="name">${pokemonName}</div>
                    <div class="mainInformation">
                            <div><b>ID:</b> #${pokemonData['id']}</div>
                            <div><b>Typ:</b> ${type1}</div>
                            <div><b>Weight:</b> ${pokemonData['weight']}Kg</div>
                    </div>
                </div>
                <div class="pokemonImageContainer">
                    <img class="pokemonImage" src="${pokemonData['sprites']['other']['dream_world']['front_default']}">
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

async function loadMorePokemons() {
    loadBeginning += 30;
    document.getElementById('mainContainer').innerHTML += '';
    await loadpokemonApi();
    await renderPokemonUrls();
}

async function showPokemon(j) {
    document.getElementById('showPokemon').classList.remove('d-none');
    document.getElementById('showPokemon').classList.add('animateIn');
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('backgroundContainer').classList.add('d-none');

    let url = links[j];
    let response = await fetch(url);
    let pokemon = await response.json();
    let type1 = pokemon['types']['0']['type']['name'];
    console.log(type1);
    console.log(pokemon);
    let number = `${pokemon['id']}`;
    console.log(number);
    let paddedNumber = number.padStart(3, "0");
    let pokemonName = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);


    let pokemoncard = document.getElementById('showPokemon');
    pokemoncard.innerHTML += /*html*/`
        <div class="pokemonBackground" id="pokemon_${j}" onclick="renderPokemonUrls()">
            <div class="pokemonCard" id="pokemonCard" onclick="stopPropagation(event)">
                <div class="cardIdNumber">
                    #${paddedNumber}
                </div>

                <div class="cardInformation">
                    <div class="aboutSection"> <!--about -->
                        <div class="cardName"> <!-- Name-->
                            ${pokemonName}
                        </div>
                        <div class="bodyInformation"> <!--Gewicht etc. -->
                            <div> <!-- Rechts-->
                            Height <br>
                            Weight <br>
                            Abilities
                            </div>
                            <div> <!-- Links-->
                            ${pokemon['height']} <br>
                            ${pokemon['weight']} <br> 
                            ${pokemon['abilities']['0']['ability']['name']}
                            </div>
                        </div>
                    </div> 
                    <div class="cardImagePosition"> <!-- IMG-->
                        <img class="cardImage" src="${pokemon['sprites']['other']['dream_world']['front_default']}">
                    </div> 
                    
                </div>                
                <!-- ${pokemon['name']}
                ${pokemon['height']} -->
            </div>
        </div>
    `;
    await selectBackground(type1, j);
}

function stopPropagation(event) {
    event.stopPropagation();
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