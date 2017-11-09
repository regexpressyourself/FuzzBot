const createAnswer  = (ans, a_num, q_id) => { 
    return `
        <li>
            <label class="label-body" for="${q_id}-${a_num}">
                <input type="radio" name="${q_id}" value="North Korea" id="${q_id}-${a_num}" />
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
        html_answers += createAnswer(ans, a_num, q_id);
    });

    return `
        <div>
            <hr />
            <p class="question">${num+1}. '${q}</p>
            <ul class="answers">
                ${html_answers}
            </ul>
            <hr />
        </div>
        `;
};

const render = (html_string) => {
    return document.createRange().createContextualFragment(html_string);
};


// quiz_questions comes from quiz_data.js
quiz_questions = quiz_questions.questions;

for (let question of quiz_questions) {
    let quiz_form = document.getElementById("inner-quiz");
    let q_num     = quiz_questions.indexOf(question);
    let new_quest = createQuestion(question, q_num);
    new_quest     = render(new_quest);

    quiz_form.appendChild(new_quest);
}

