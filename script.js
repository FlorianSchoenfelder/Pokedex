let mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let links = [];
let loadBeginning = 30;
let currentPokemon = 0;
let loadedPokemons = [];
let searchIndex = false;
pokemonStats = [];

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
// console.log(responseAsJson['results']);

async function renderPokemonUrls() {
    loadedPokemons = [];
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

        let detailSightVariables = variablesForDetailSight(pokemonData);
        loadedPokemons.push(pokemonData['name']);
        document.getElementById('mainContainer').innerHTML += renderPokemonUrlsHTML(detailSightVariables, pokemonData, j);

        await selectBackground(detailSightVariables.type1, j);
    }
}
// let type1 = pokemonData['types']['0']['type']['name'];
// let weightWithComma = pokemonData['weight'] * 0.1;
// let weight = weightWithComma.toFixed(1);
// console.log(loadedPokemons);
// let pokemonName = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1);
// console.log(pokemonData);
// document.getElementById('mainContainer').innerHTML +=``;

function renderPokemonUrlsHTML(detailSightVariables, pokemonData, j) {
    return  /*html*/`
    <div class="pokemon" id="pokemon_${j}" onclick="showPokemon(${j})">
        <div class="information">
            <div class="name">${detailSightVariables.pokemonName}</div>
            <div class="mainInformation">
                    <div><b>ID:</b> #${pokemonData['id']}</div>
                    <div><b>Typ:</b> ${detailSightVariables.type1}</div>
                    <div><b>Weight:</b> ${detailSightVariables.weight}Kg</div>
            </div>
        </div>
        <div class="pokemonImageContainer">
            <img class="pokemonImage" src="${pokemonData['sprites']['other']['dream_world']['front_default']}">
        </div>        
    </div>
`;
}

async function loadMorePokemons() {
    loadBeginning += 30;
    document.getElementById('mainContainer').innerHTML += '';
    links = [];
    loadedPokemons = [];
    await loadpokemonApi();
    await renderPokemonUrls();
}

async function showPokemon(j) {
    currentPokemon = j;
    document.getElementById('showPokemon').classList.remove('d-none');
    document.getElementById('showPokemon').classList.add('animateIn');
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('backgroundContainer').classList.add('d-none');
    let inputField = document.getElementById('searching');
    // inputField.value = ''; // Falls vorher über die Suchfunktion ein Pokemon gesucht wurde, wird das Inputfeld geleert.

    let url = links[j];
    let response = await fetch(url);
    let pokemon = await response.json();

    let detailSightVariables = variablesForDetailSight(pokemon); // detailSightVariables hat alle Variablen aus der Funktion
    console.log(detailSightVariables.type2);
    console.log(pokemon);
    console.log(detailSightVariables.number);

    let pokemoncard = document.getElementById('showPokemon');
    pokemoncard.innerHTML = '';
    pokemoncard.innerHTML += showPokemonHTML(detailSightVariables, pokemon, j);
    await selectDetailedBackground(detailSightVariables.type2, j);
    await renderChart(pokemon);
}

function showPokemonHTML(detailSightVariables, pokemon, j) {
    return /*html*/`
    <div class="pokemonBackground" id="detailedPokemon_${j}" onclick="closePokemon()">
        <div class="previousContainer" id="previous" onclick="stopPropagation(event)">
            <img onclick="toPreviousPokemon()" class="previous" src="./img/arrowPrevious.svg" alt="">
        </div>
        <div class="pokemonCard" id="pokemonCard" onclick="stopPropagation(event)">
            <div class="cardIdNumber">
                <span>#${detailSightVariables.paddedNumber}</span>
                <!-- Mit der Variable und .XXX wird der Wert herausgefiltert der benötigt wird.-->
            </div>

            <div class="cardInformation">
                <div class="aboutSection"> <!--about -->
                    <div class="cardName"> <!-- Name-->
                        ${detailSightVariables.pokemonName}
                    </div>
                    <div class="bodyInformation"> <!--Gewicht etc. -->
                        <div> <!-- Rechts-->
                        Height <br>
                        Weight <br>
                        Abilities
                        </div>
                        <div> <!-- Links-->
                        ${detailSightVariables.height}m <br>
                        ${detailSightVariables.weight}kg<br> 
                        ${detailSightVariables.abilities}
                        </div>
                    </div>
                </div> 
                <div class="cardImagePosition"> <!-- IMG-->
                    <img class="cardImage" src="${pokemon['sprites']['other']['dream_world']['front_default']}">
                </div> 
                
            </div>
            <div class="chartContainer">
                <canvas id="myChart" width="800px" height="300px"  onload="renderChart(${pokemon})">
                    
                </canvas>
            </div>
            
        </div>
        <div class="nextContainer" id="next" onclick="stopPropagation(event)">
            <img onclick="toNextPokemon()" class="next" src="./img/arrowNext.svg" alt="">
        </div>
    </div>
`;
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

async function renderChart(pokemon) {
    let detailSightVariables = variablesForStats(pokemon);
    const ctx = document.getElementById('myChart');
    Chart.defaults.color = '#FFFFFF';
    Chart.defaults.borderColor = 'black';

    new Chart(ctx, {
        type: 'bar',
        backgroundColor: '#FFFFFF',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],

            datasets: [{
                label: 'Stat Values',
                data: [detailSightVariables.stat1, detailSightVariables.stat2, detailSightVariables.stat3, detailSightVariables.stat4, detailSightVariables.stat5, detailSightVariables.stat6],
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 50,
                
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    display: false,
                    max: 100
                },
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                filler: {
                    propagate: true
                }
            }
        }
    });
}


async function closePokemon() {
    document.getElementById('showPokemon').classList.add('d-none');
    document.getElementById('showPokemon').classList.remove('animateIn');
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('backgroundContainer').classList.remove('d-none');
}

async function toPreviousPokemon() {
    let button = document.getElementById('previous');
    if (currentPokemon >= 1) {
        currentPokemon--;
    } else {
        button.style.display = 'none';
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
    let type2 = pokemon['types']['0']['type']['name'];
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
        type2,
        number,
        paddedNumber,
        pokemonName,
        abilities,
        height,
        weight,

    };
}

async function searchPokemon() {
    let searchInput = document.getElementById('searching').value.toLowerCase();

    if (!searchInput == '') {
        let searchResultContainer = document.getElementById('mainContainer');
        searchResultContainer.innerHTML = ''; // Clear previous results
        document.getElementById('showMore').classList.add('d-none');
        searchIndex = true;

        for (let index = 0; index < loadedPokemons.length; index++) {
            let name = loadedPokemons[index];
            if (name.toLowerCase().includes(searchInput)) {
                await displayPokemon(name, index);
            }
        }
    }
    else if (searchInput == '' && searchIndex === true) {
        searchIndex = false;
        renderPokemonUrls();
        document.getElementById('showMore').classList.remove('d-none');
    }
}

async function displayPokemon(pokemon, index) {

    try {
        let link = mainUrl + `${pokemon}`;
        let response = await fetch(link);

        if (!response.ok) {
            alert(`Unable to fetch data for ${pokemon}`);
        }

        let data = await response.json();
        let pokemonHTML = getPokemonHTML(data, index);

        document.getElementById('mainContainer').innerHTML += pokemonHTML;
        selectBackground(data['types'][0]['type']['name'], index);
        document.getElementById('mainContainer').setAttribute("class", "mainContainerSearch");

    } catch (error) {
        console.error(error);
    }
}

function getPokemonHTML(data, index) {
    return /*html*/`
        <div class="pokemon" id="pokemon_${index}" onclick="showPokemon(${index})">
            <div class="information">
                <div class="name">${data['name']}</div>
                <div class="mainInformation">
                    <div><b>ID:</b> #${data['id']}</div>
                    <div><b>Typ:</b> ${data['types'][0]['type']['name']}</div>
                    <div><b>Weight:</b> ${data['weight']}Kg</div>
                </div>
            </div>
            <div class="pokemonImageContainer">
                <img class="pokemonImage" src="${data['sprites']['other']['dream_world']['front_default']}">
            </div>
        </div> 
    `;
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
    if (type1 == 'fighting') {
        pokemonElement.classList.add('fightingBackground');
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

function selectDetailedBackground(type2, index) {
    let detailedElement = document.getElementById('detailedPokemon_' + index);

    if (type2 == 'grass') {
        detailedElement.classList.add('detailedgrassBackground');
    }
    if (type2 == 'fire') {
        detailedElement.classList.add('detailedfireBackground');
    }
    if (type2 == 'water') {
        detailedElement.classList.add('detailedwaterBackground');
    }
    if (type2 == 'bug') {
        detailedElement.classList.add('detailedbugBackground');
    }
    if (type2 == 'normal') {
        detailedElement.classList.add('detailednormalBackground');
    }
    if (type2 == 'poison') {
        detailedElement.classList.add('detailedpoisonBackground');
    }
    if (type2 == 'electric') {
        detailedElement.classList.add('detailedelectricBackground');
    }
    if (type2 == 'ground') {
        detailedElement.classList.add('detailedgroundBackground');
    }
    if (type2 == 'fighting') {
        detailedElement.classList.add('detailedfightingBackground');
    }
    if (type2 == 'fairy') {
        detailedElement.classList.add('detailedfairyBackground');
    }
    if (type2 == 'psychic') {
        detailedElement.classList.add('detailedpsychicBackground');
    }
    if (type2 == 'rock') {
        detailedElement.classList.add('detailedrockBackground');
    }
    if (type2 == 'ghost') {
        detailedElement.classList.add('detailedghostBackground');
    }
}