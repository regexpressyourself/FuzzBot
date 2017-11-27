function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let answers = JSON.parse(httpGet("/api/get_answers"));

let selectAnswer = (q_num) => {
    // get the question element/text
    let q_id = "q"+q_num;
    let q = document.getElementById(q_id);

    if (!q) {return;}
    else { 
        q.scrollIntoView({ behavior: 'smooth' });
        q = q.innerHTML;
    }

    // get the answer elements
    let a = [];
    let num_answers = document.getElementById(q_id+"_answers").children.length; 
    if (num_answers > 4) {return;}

    // iterate through the answers, making an array to query against
    for (let i = 0; i < num_answers; i++) {
        let a_id = q_id+"-"+i;
        a.push(document.getElementById(q_id+"-"+i).value);
    }

    // get a random answer number 
    let ans_num  = Math.floor(Math.random() * (num_answers - 0)); 

    // select that answer
    document.getElementById(q_id+"-"+ans_num).checked = true;
}

let takeTest = (json_data) => 
{
    for (let q_num of Array(20).keys()) {
        // wait a second
        // window.setTimeout(function, milliseconds);
        sleep(200*q_num).then(() => {selectAnswer(q_num)})
    }
}



document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        takeTest({});
    }
}

