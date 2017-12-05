function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let results = JSON.parse(httpGet("/api/send_quiz"));

let correct = results["num_correct"]/20*100 + "%";

let num_guessed = results["num_guessed"];

let num_guessed_correctly = results["num_guessed_correctly"]/num_guessed*100 

let guessed_hist = results["guessed_hist"];
let guessed_correctly_hist = results["guessed_correctly_hist"];
let correct_hist= results["correct_hist"];

if (isNaN(num_guessed_correctly)) {
    num_guessed_correctly = "N/A";
}
else {
    num_guessed_correctly = num_guessed_correctly + "%"
}

document.getElementById("total-grade").innerHTML = correct;
document.getElementById("num-guessed").innerHTML = num_guessed;
document.getElementById("guessed-correct").innerHTML = num_guessed_correctly;
let ctx = document.getElementById('result-chart').getContext('2d');

let labels = [...Array(guessed_hist.length).keys()];

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            { 
                data: correct_hist,
                label: "Correct",
                borderColor: "green",
                fill: false
            },
            { 
                data: guessed_hist,
                label: "Guessed",
                borderColor: "red",
                fill: false
            }
        ]},
    options: {
        title: {
            display: true,
            text: 'Change in questions guessed vs. questions known'
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Questions'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Epoch Number'
                }
            }]
    }
    }

});
