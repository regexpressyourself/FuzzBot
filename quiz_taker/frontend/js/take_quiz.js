function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let previous_attempt_data = JSON.parse(httpGet("/api/get_answers"));

let checkAnswers = (q) => {
    //let i = 0;
    let answer_map = {};
    /*
    for (let ans of previous_attempt_data) {
        // TODO: change this to a fuzzy check
        // Perhaps iterate through all answers and select the 
        // "closest" one
        if (q == ans["q"]) {
            return i;
        }
        i++;
    }*/
    var options = {
        shouldSort: true,
        //tokenize: true,
        includeScore: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "q"
        ]
    };
    var fuse = new Fuse(previous_attempt_data, options); // "list" is the item array
    var result = fuse.search(q);
    //return result;
    console.log("length");
    console.log(result.length);
    if(result.length > 0){
        console.log(result[0]['item']);
        console.log(previous_attempt_data[previous_attempt_data.indexOf(result[0]['item'])]);
        return previous_attempt_data.indexOf(result[0]['item']);
    }
    return -1;
}

let selectAnswer = (q_num) => {
    // get the question element/text
    let q_id = "q" + q_num;
    let q = document.getElementById(q_id);

    if (!q) {
        return;
    } else {
        q.scrollIntoView({
            behavior: 'smooth'
        });
        q = q.innerHTML;
    }

    // get the answer elements
    let answers = [];
    let num_answers = document.getElementById(q_id + "_answers").children.length;
    if (num_answers > 4) {
        return;
    }

    // iterate through the answers, making an array to query against
    for (let i = 0; i < num_answers; i++) {
        let a_id = q_id + "-" + i;
        answers.push(document.getElementById(q_id + "-" + i).value.substring(3));
    }

    // select an answer
    let ans_index = checkAnswers(q); // get the index of the answer data
    let known_q_data; // the answer data from previous attempts
    let ans_num; // the number of the answer to be guessed

    // if we've seen the question before...
    if (ans_index >= 0) {
        known_q_data = previous_attempt_data[ans_index];
        // guess the correct answer if we know it
        if (known_q_data["correct"]) {
            //ans_num = answers.indexOf(known_q_data["correct"]);
            var options = {
                shouldSort: true,
                //tokenize: true,
                includeScore: true,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "q"
                ]
            };
            var fuse = new Fuse(answers, options); // "list" is the item array
            var result = fuse.search(known_q_data[correct]);


        }
        // otherwise, guess a previously-unguessed answer
        else {
            ans_num = guessUnguessedAnswer(known_q_data, answers);
        }
    }
    // if we haven't seen the answer before, guess randomly
    else {
        ans_num = naiveGuess(num_answers);
    }
    // select the answer at ans_num
    document.getElementById(q_id + "-" + ans_num).checked = true;
}

let naiveGuess = (num_answers) => {
    // TODO: optimize the random guesses here
    return Math.floor(Math.random() * num_answers);
}

let guessUnguessedAnswer = (known_q_data, answers) => {
    // TODO: optimize the educated guesses here
    let ans_num = -1;
    for (let i = 0; i < answers.length; i++) {
        let ans = answers[i];
        if (known_q_data["guessed"].indexOf(ans) < 0) {
            ans_num = i;
            break;
        }
    }
    return ans_num;
}

let changeRobotCaption = () => {
    let robot_captions = ["Woo! This one's tough",
        "Oops, didn't study that!",
        "Maybe I shouldn't have skipped class...",
        "Did we ever talk about this?",
        "If I can get a C, I'll be happy",
        "No one cares about GPA anyway, right?",
        "Sure hope there's extra credit",
        "That's it, I'm going to office hours",
        "Wait, we needed to know that?"
    ];
    return robot_captions[Math.floor(Math.random() * robot_captions.length)];
}

let botStartTest = (robot_image, robot_chat) => {
    robot_image.style.position = "fixed";
    robot_image.style.top = "50%";

    robot_chat.className = "top-chat";
    return 1;
}

let botCompleteTest = (robot_image, robot_chat) => {
    robot_image.style.bottom = "0px";
    robot_image.style.top = "initial";

    robot_chat.className = "side-chat";
    robot_chat.innerText = "Let's see how we did!";
    return 1;
}

let takeTest = (json_data) => {
    let robot_image = document.getElementById("bot-image");
    let robot_chat = document.getElementById("bot-chat");

    botStartTest(robot_image, robot_chat);
    for (let q_num of Array(20).keys()) {
        // wait a bit
        if (q_num % 3 === 0 && q_num < 17) {
            sleep(300 * q_num).then(() => {
                selectAnswer(q_num);
                robot_chat.innerText = changeRobotCaption();
            })
        } else {
            sleep(300 * q_num).then(() => {
                selectAnswer(q_num)
            })
        }
    }
    sleep(300 * 20).then(() => {
        botCompleteTest(robot_image, robot_chat)
    })
}
