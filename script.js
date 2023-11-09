let element;
let links = [];

async function loadpokemonApi() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(url);
    let responseAsJson = await response.json();

    // console.log(responseAsJson['results']);

    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        // console.log(element);
        renderPokemonUrl(element);
    }

    
}

async function renderPokemonUrl(element) {
    let url = element['url'];
    let response1 = await fetch(url);
    let responseAsJson1 = await response1.json();
    console.log(responseAsJson1);
    links.push(responseAsJson1);
    // for (let j = 0; j < responseAsJson1.length; j++) {
    //     const newElement = responseAsJson1[j];
        
    // }
}

// Links wurden geladen.
//Nächste aufgabe von den Links in das Feld des Namen zu kommen und anzeigen zu lassen.