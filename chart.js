async function renderChart(pokemon) {
    let detailSightVariables = variablesForStats(pokemon);
    const ctx = document.getElementById('myChart');
    Chart.defaults.color = '#FFFFFF';
    Chart.defaults.borderColor = 'black';

    let chartJsOptions = {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                display: false,
                max: 150
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
    };
    let chartJsData = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [{
            label: 'Stat Values',
            data: [detailSightVariables.stat1, detailSightVariables.stat2, detailSightVariables.stat3, detailSightVariables.stat4, detailSightVariables.stat5, detailSightVariables.stat6],
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 50,
        }]
    };
    let chartJsConfig = {
        type: 'bar',
        backgroundColor: '#FFFFFF',
        data: chartJsData,
        plugins: [ChartDataLabels],
        options: chartJsOptions
    };
    new Chart(ctx, chartJsConfig);
}