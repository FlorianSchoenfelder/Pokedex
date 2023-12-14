let mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let links = [];
let pokemonArray = [];
let loadBeginning = 30;
let currentPokemon = 0;
let loadedPokemons = [];
let searchIndex = false;
let pokemonStats = [];
let timerForSearching = 0;

async function init() {
    await loadpokemonApi();
    renderPokemonUrls(); // Rufe die Funktion zum Rendern der Pokemon-URLs auf, nachdem alle URLs geladen wurden
}

async function loadpokemonApi() {
    let url = mainUrl + `?limit=${loadBeginning}&offset=0`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        links.push(element['url']); // Speichere nur die URL in der links-Liste
    }
}

async function renderPokemonUrls() {
    loadedPokemons = [];
    pokemonArray= [];
    changeElements();

    for (let j = 0; j < links.length; j++) {
        const url = links[j];
        let response = await fetch(url);
        let pokemonData = await response.json();
        pokemonArray.push(pokemonData);
        let detailSightVariables = variablesForDetailSight(pokemonData);
        loadedPokemons.push(pokemonData['name']);
        document.getElementById('mainContainer').innerHTML += renderPokemonUrlsHTML(detailSightVariables, pokemonData, j);
        await selectBackground(detailSightVariables.type1, j);
    }
}

function changeElements() {
    document.getElementById('mainContainer').classList.add('animateIn');
    document.getElementById('showPokemon').classList.add('d-none');
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('backgroundContainer').classList.remove('d-none');
    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('mainContainer').innerHTML = '';
}

async function loadMorePokemons() {
    loadAnimation();
    loadBeginning += 30;
    document.getElementById('mainContainer').innerHTML += '';
    links = [];
    loadedPokemons = [];
    await loadpokemonApi();
    setTimeout(await renderPokemonUrls(), 4000);
    endLoadAnimation();
}

function loadAnimation() {
    let animateShow = document.getElementById('loadingScreenId');
    animateShow.style.display = "block";
}

function endLoadAnimation() {
    let animateShow = document.getElementById('loadingScreenId');
    animateShow.style.display = "none";
}

async function showPokemon(j) {
    currentPokemon = j;
    changeElementsOnDisplayedPokemon();
    let url = links[j];
    let response = await fetch(url);
    let pokemon = await response.json();
    console.log(pokemon);
    let detailSightVariables = variablesForDetailSight(pokemon); // detailSightVariables hat alle Variablen aus der Funktion
    let pokemoncard = document.getElementById('showPokemon');

    pokemoncard.innerHTML = '';
    pokemoncard.innerHTML += showPokemonHTML(detailSightVariables, pokemon, j);
    await selectBackground(detailSightVariables.type1, j);
    await renderChart(pokemon);
    if (currentPokemon == 0) { // Wenn erstes Pokemon ausgewählt, dann kein Pfeil mehr Richtung zurück.
        document.getElementById('previous').classList.add('d-none');
    }
    if (currentPokemon == links.length - 1) { // Letztes Pokemon in der Liste = nicht kein Pfeil Richtung weiter.
        document.getElementById('next').classList.add('d-none');
    }
}

function changeElementsOnDisplayedPokemon() {
    document.getElementById('showPokemon').classList.remove('d-none');
    document.getElementById('showPokemon').classList.add('animateIn');
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('backgroundContainer').classList.add('d-none');
}

function variablesForStats(pokemon) {

    let stat1 = pokemon['stats']['0']['base_stat'];
    let stat2 = pokemon['stats']['1']['base_stat'];
    let stat3 = pokemon['stats']['2']['base_stat'];
    let stat4 = pokemon['stats']['3']['base_stat'];
    let stat5 = pokemon['stats']['4']['base_stat'];
    let stat6 = pokemon['stats']['5']['base_stat'];
    return {
        stat1,
        stat2,
        stat3,
        stat4,
        stat5,
        stat6
    };
}

async function closePokemon() {
    document.getElementById('showPokemon').classList.add('d-none');
    document.getElementById('showPokemon').classList.remove('animateIn');
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('backgroundContainer').classList.remove('d-none');
}

async function toPreviousPokemon() {
    if (currentPokemon >= 1) {
        currentPokemon--;
    }
    showPokemon(currentPokemon);
}


async function toNextPokemon() {
    if (currentPokemon <= links.length) {
        currentPokemon++;
    }
    showPokemon(currentPokemon);
}

function variablesForDetailSight(pokemon) {
    let type1 = pokemon['types']['0']['type']['name'];
    let number = `${pokemon['id']}`;
    let paddedNumber = number.padStart(3, "0");
    let pokemonName = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    let abilities = pokemon['abilities']['0']['ability']['name'].charAt(0).toUpperCase() + pokemon['abilities']['0']['ability']['name'].slice(1)
    let heightWithComma = pokemon['height'] * 0.1;
    let height = heightWithComma.toFixed(1);
    let weightWithComma = pokemon['weight'] * 0.1;
    let weight = weightWithComma.toFixed(1);
    // Return an object with the variables
    return {
        type1,
        number,
        paddedNumber,
        pokemonName,
        abilities,
        height,
        weight,
    };
}

function delaySearchPokemon() {
    clearTimeout(timerForSearching);
    timerForSearching = setTimeout(searchPokemon, 350); // Wartezeit von 350 Millisekunden
}

function searchPokemon() {
    let searchInput = document.getElementById('searching').value.toLowerCase();
    if (!searchInput == '') {
        clearPreviousResults();

        document.getElementById('showMore').classList.add('d-none');
        searchIndex = true;
        for (let index = 0; index < pokemonArray.length; index++) {
            let name = pokemonArray[index];
            

            if (name['name'].toLowerCase().includes(searchInput)) {
                document.getElementById('mainContainer').innerHTML += getPokemonHTML(name, index); 
                document.getElementById('mainContainer').setAttribute("class", "mainContainerSearch");
                selectBackground(name['types'][0]['type']['name'], index);
            }
        }
    } else if (searchInput == '' && searchIndex === true) {
        // Aufgerufen wenn Textfeld leer
        emptyInput();
    }
}

function clearPreviousResults() {
    let searchResultContainer = document.getElementById('mainContainer');
    searchResultContainer.innerHTML = '';
}

function emptyInput() {
    searchIndex = false;
    renderPokemonUrls();
    document.getElementById('showMore').classList.remove('d-none');
}

function stopPropagation(event) {
    event.stopPropagation();
}

function selectBackground(type1, index) {
    let pokemonElement = document.getElementById('pokemon_' + index);
    pokemonElement.classList.add(type1);
}