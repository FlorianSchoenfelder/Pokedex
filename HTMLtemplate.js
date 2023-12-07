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
            <div class="chartContainer" style="position: relative">
                <canvas id="myChart" onload="renderChart(${pokemon})">
                    
                </canvas>
            </div>
            
        </div>
        <div class="nextContainer" id="next" onclick="stopPropagation(event)">
            <img onclick="toNextPokemon()" class="next" src="./img/arrowNext.svg" alt="">
        </div>
        <div class="closeButton" onclick="stopPropagation(event)">
        <img onclick="closePokemon()" src="./img/close.svg">
        </div>
    </div>
    
`;
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