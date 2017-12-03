const createAnswer  = (ans, a_num, q, q_id) => { 
    let letter = ["a", "b", "c", "d"][a_num];

    return `
        <li>
            <label class="label-body" for="${q_id}-${a_num}">
                <input type="radio" name="${q}" value="${letter}: ${ans}" id="${q_id}-${a_num}" />
                <span class="label-body">${ans}
                </span>
            </label>
        </li>
        `;
};

const createQuestion = (question, num) => {
    let q            = question.q;
    let answers      = question.a;
    let q_id         = 'q'+num;
    let html_answers = "";

    answers.map((ans) => {
        let a_num     = answers.indexOf(ans);
        html_answers += createAnswer(ans, a_num, q, q_id);
    });

    return `
        <div>
            <hr />
            <p class="question">${num+1}. <span id="${q_id}">${q}</span></p>
            <ul id="${q_id}_answers" class="answers">
                ${html_answers}
            </ul>
            <hr />
        </div>
        `;
};

const render = (html_string) => {
    return document.createRange().createContextualFragment(html_string);
};

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// quiz_questions comes from quiz_data.js
quiz_questions = JSON.parse(httpGet("/api/get_questions"));

let quiz_form = document.getElementById("inner-quiz");
let i = 0;
let selected = [];
while (i<20){
    let selection = null;
    do{
        selection = Math.floor((Math.random() * quiz_questions.length));
    }while(selected.includes(selection)==true)
    let q_num     = i;
    let question  = quiz_questions[selection];
    let new_quest = createQuestion(question, q_num);
    new_quest     = render(new_quest);

    quiz_form.appendChild(new_quest);
    i++;
}

