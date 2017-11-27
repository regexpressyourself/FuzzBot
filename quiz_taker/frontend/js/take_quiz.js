function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let answers = JSON.parse(httpGet("/api/get_answers"));

let checkAnswers = (q) => {
    let i = 0;
    for (let ans of answers) {
        if (q == ans["q"]){
            return i;
        }
        i++;
    }
    return -1;
}

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
        a.push(document.getElementById(q_id+"-"+i).value.substring(3));
    }

    let ans_index = checkAnswers(q);
    let prev_ans;
    let ans_num;
    if (ans_index >= 0) {
        prev_ans = answers[ans_index];
        if (prev_ans["correct"]) {
            ans_num = a.indexOf(prev_ans["correct"]);
        }
        else {
            let i = 0;
            for (let ans of a) {
                if (prev_ans["guessed"].indexOf(ans) < 0) {
                    console.log(prev_ans);
                    console.log(i);
                    ans_num = i;
                    break;
                }
                i++;
            }
        }
    }
    else {
        // get a random answer number 
        ans_num  = Math.floor(Math.random() * (num_answers - 0)); 
    }

    // select that answer
    console.log(q_id+"-"+ans_num);
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

