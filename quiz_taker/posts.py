from quiz_taker import app, send_from_directory, \
        jsonify, request, os, json, redirect

##################################################
# POST Requests
##################################################

SITE_ROOT    = os.path.realpath(os.path.dirname(__file__))
question_url = os.path.join(SITE_ROOT, 'frontend/config', 'quiz_data.json')
quiz_data    = json.load(open(question_url))
answer_url   = os.path.join(SITE_ROOT, 'frontend/config', 'answer_data.json')

# stored globally in order to hold values in runtime over multiple requests

correct_hist           = []
num_correct            = 0

guessed_hist           = []
num_guessed            = 0

guessed_correctly_hist = []
num_guessed_correctly  = 0

def find_question(q, answer_data):
    # get the question's index in our answer bank, if it exists
    # return -1 if it does not exist
    i = 0
    for quest in answer_data:
        if q == quest["q"]:
            return i
        i += 1
    return -1

def get_ans(q):
    # get the actual correct answer
    for quest in quiz_data:
        if q == quest["q"]:
            return quest["correct"]
    return -1

def setup_ans(q_index, quest, answer_data):
    # set up an answer object for us
    if q_index >= 0:
        ans = answer_data[q_index]
    else:
        ans            = {}
        ans["q"]       = quest
        ans["guessed"] = []
    return ans

def handle_post(request):
    global num_correct
    global num_guessed
    global num_guessed_correctly
    answer_data = json.load(open(answer_url))

    num_correct           = 0
    num_guessed           = 0
    num_guessed_correctly = 0

    for quest in request.form:
        given_ans_letter = request.form[quest][:1]
        given_ans        = request.form[quest][3:]
        q_index          = find_question(quest, answer_data)
        ans              = setup_ans(q_index, quest, answer_data)

        # increment the number of guesses if we didn't
        # already know the correct answer
        if not ("correct" in ans):
            num_guessed += 1

        if q_index >= 0:
            answer_data[q_index] = ans;
        else:
            answer_data.append(ans)

        # if we got it right, log it
        correct_ans = get_ans(quest)
        is_correct  = (correct_ans == given_ans)
        if is_correct:
            # if we guessed it right, log num_guessed_correctly
            if not ("correct" in ans):
                num_guessed_correctly += 1
            ans["correct"]  = given_ans
            num_correct    += 1

        # add the new guess to the guessed answers
        if given_ans not in ans["guessed"]:
            if not ("correct" in ans):
                ans["guessed"].append(given_ans)
            else:
                if given_ans not in ans["correct"]:
                     ans["guessed"].append(given_ans)

    # update our answers file with the new attempt
    with open(answer_url,"w") as fo:
        fo.write(json.dumps(answer_data))

    return

@app.route('/fuzzbot/api/send_quiz', methods=['POST', 'GET'])
def send_quiz():
    global num_correct
    global num_guessed
    global num_guessed_correctly
    if request.method == 'POST':
        handle_post(request)
        guessed_hist.append(num_guessed)
        guessed_correctly_hist.append(num_guessed_correctly)
        correct_hist.append(num_correct)
        # send the user off to the results page
        return redirect("/fuzzbot/results", code=302)
    else:
        return jsonify({ 
                    "num_guessed": num_guessed, 
                    "num_guessed_correctly": num_guessed_correctly, 
                    "num_correct": num_correct,
                    "guessed_hist": guessed_hist,
                    "guessed_correctly_hist": guessed_correctly_hist,
                    "correct_hist": correct_hist
                    })
