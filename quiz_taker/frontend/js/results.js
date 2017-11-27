function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let results = JSON.parse(httpGet("/api/send_quiz"));

correct = results["num_correct"]/20*100 + "%";
let num_guessed = results["num_guessed"];
num_guessed_correctly = results["num_guessed_correctly"]/num_guessed*100 
if (isNaN(num_guessed_correctly)) {
    num_guessed_correctly = "N/A";
}
else {
    num_guessed_correctly = num_guessed_correctly + "%"
}

document.getElementById("total-grade").innerHTML = correct;
document.getElementById("num-guessed").innerHTML = num_guessed;
document.getElementById("guessed-correct").innerHTML = num_guessed_correctly;
