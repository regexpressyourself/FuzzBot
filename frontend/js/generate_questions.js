let quiz_html = document.createElement('div');

quiz_questions = quiz_questions.questions;

let get_answer_tag = function(ans, a_num, q_id) 
{
    /* Create the tag for an answer in the form:
     * <li>
     *   <label class="label-body" for="q0-a0">
     *     <input type="radio" name="q0" value="North Korea" id="q0-a0">
     *     <span class="label-body">A. North Korea</span>
     *   </label>
     * </li>
     */

    // get our relevant answer data
    let a_id      = q_id+'-a'+a_num;
    let abcd        = ['A. ', 'B. ', 'C. ', 'D. '];

    // create our html tags
    let li_tag    = document.createElement('li');
    let label_tag = document.createElement('label');
    let input_tag = document.createElement('input');
    let span_tag  = document.createElement('span');

    // set up all the tags
    label_tag.className = 'label-body';
    label_tag.setAttribute('for', a_id);

    input_tag.setAttribute('type', 'radio');
    input_tag.setAttribute('name', q_id);
    input_tag.setAttribute('value', ans);
    input_tag.setAttribute('id', a_id);

    span_tag.className = 'label-body';
    span_tag.innerHTML = abcd[a_num] +''+ ans;

    // put it all together, working from the inner-most elements out
    label_tag.appendChild(input_tag);
    label_tag.appendChild(span_tag);
    li_tag.appendChild(label_tag);
    return li_tag;
}

let create_question = function(question, num) 
{
    // Get the question data
    let q           = question.q;
    let answers     = question.a;
    let return_html = "";
    let q_id        = 'q'+num;

    // set up our question-level elements
    let q_outer_html = document.createElement('div');
    let q_p_tag      = document.createElement('p');
    let ul_tag       = document.createElement('ul');

    // Set up the question element
    q_p_tag.className = 'question';
    q_p_tag.innerHTML = (num+1)+'. '+q;

    // set up our list of answers
    ul_tag.className  = 'answers';

    // add all the answer elements
    for (let ans of answers) {
        let a_num = answers.indexOf(ans);
        ul_tag.appendChild(get_answer_tag(ans, a_num, q_id));
    }

    // here we actually populate the elements we've created with our data
    q_outer_html.appendChild(document.createElement('hr'));
    q_outer_html.appendChild(q_p_tag);
    q_outer_html.appendChild(ul_tag);

    // and return the full question's HTML
    return q_outer_html;
}

for (let question of quiz_questions) {
    let quiz_form = document.getElementById("inner-quiz");
    let q_num = quiz_questions.indexOf(question);
    quiz_form.appendChild(create_question(question, q_num));
}

