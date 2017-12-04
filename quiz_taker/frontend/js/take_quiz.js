function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let previous_attempt_data = JSON.parse(httpGet("/api/get_answers"));

let fuzz = (search, array, threshold, keys) => {
    var options = {
        shouldSort: true,
        //tokenize: true,
        includeScore: true,
        threshold: threshold,
        location: 0,
        distance: 100,
        maxPatternLength: 100,
        minMatchCharLength: 1,
        keys: keys
    };
    var fuse = new Fuse(array, options);
    var result = fuse.search(search);
    return result;
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
        answers.push({'a':document.getElementById(q_id + "-" + i).value.substring(3)});
    }

    // select an answer
    let ans_data = fuzz(q, previous_attempt_data, 0.4, [{name:'q', weight:0.8},{name:'correct', weight:0.1}, {name:'guessed', weight:0.1}]); // get the index of the answer data
    let ans_num; // the number of the answer to be guessed
    let chosen_answer; //answer selected
    // if we've seen the question before...
    if (ans_data.length>0) {
        // guess the correct answer if we know it
        if(ans_data[0]['item']["correct"]){
            chosen_answer = fuzz(ans_data[0]['item']["correct"], answers, 1, ['a']);
            if (chosen_answer.length>0){
                ans_num = answers.findIndex(i => i.a === chosen_answer[0]['item']['a']);
            }else{
                chosen_answer = antiguess(ans_data, q, answers);
                ans_num = answers.findIndex(i => i.a === chosen_answer[0]['item']['a']);
            }
        }
        // otherwise, guess a previously-unguessed answer
        else {
            chosen_answer = antiguess(ans_data, q, answers);
            ans_num = answers.findIndex(i => i.a === chosen_answer[0]['item']['a']);
        }
    }
    // if we haven't seen the answer before, guess randomly
    else {
        chosen_answer = guess(q, answers);
        ans_num = answers.findIndex(i => i.a === chosen_answer[0]['item']['a']);
    }
    // select the answer at ans_num
    document.getElementById(q_id + "-" + ans_num).checked = true;
}

let antiguess = (ans_data, question, answers) => {
    let copyanswers = answers.slice(0);
    let incorrect = ans_data[0]['item']['guessed'];
    for (let thing of incorrect) {
        if(copyanswers.findIndex(i => i.a === thing)>=0){
            copyanswers.splice(copyanswers.findIndex(i => i.a === thing), 1);
        }
    }
    let data = fuzz(incorrect.join(" "), copyanswers, 1, ['a']);
    if (data.length>0){
        return [data[data.length-1]];
    }else{
        return guess(question, answers);
    }
}

let guess = (question, answers) => {
    let chosen_answer = fuzz(question, answers, 1.0, ['a']);
    return chosen_answer;
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
