from quiz_taker import app, send_from_directory, jsonify, request, os, json

##################################################
# POST Requests
##################################################

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
question_url = os.path.join(SITE_ROOT, 'frontend/config', 'quiz_data.json')
quiz_data = json.load(open(question_url))

answer_url = os.path.join(SITE_ROOT, 'frontend/config', 'answer_data.json')
answer_data = json.load(open(answer_url))

def find_question(q):
    i = 0
    for quest in answer_data:
        if q == quest["q"]:
            return i
        i += 1
    return -1

def get_ans(q):
    for quest in quiz_data:
        if q == quest["q"]:
            return quest["correct"]
    return -1


@app.route('/api/send_quiz', methods=['POST'])
def send_quiz():
    num_correct = 0
    num_guessed = 0;
    num_guessed_correctly = 0
    for quest in request.form:
        correct_ans = get_ans(quest)
        given_ans = request.form[quest][3:]
        is_correct = correct_ans == given_ans

        q_index = find_question(quest)

        if q_index >= 0:
            ans = answer_data[q_index]
        else:
            ans = {}
            ans["q"] = quest
            ans["guessed"] = []

        if given_ans not in ans["guessed"]:
            ans["guessed"].append(given_ans)

        if not ("correct" in ans):
            num_guessed += 1

        if is_correct:
            if not ("correct" in ans):
                num_guessed_correctly += 1
            ans["correct"] = given_ans
            num_correct += 1

        answer_data.append(ans)

    with open(answer_url,"w") as fo:
        fo.write(json.dumps(answer_data))

    return_string = "You got " + str(num_correct/20*100) + "%\n"
    return_string = return_string + "You guessed with " + str(num_guessed_correctly/num_guessed*100) + "% success\n"
    return return_string


