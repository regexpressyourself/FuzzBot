from quiz_taker import app, send_from_directory, jsonify, os, json

##################################################
# GET Requests
##################################################

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
quiz_url = os.path.join(SITE_ROOT, 'frontend/config', 'quiz_data.json')
quiz_data = json.load(open(quiz_url))

answer_url = os.path.join(SITE_ROOT, 'frontend/config', 'answer_data.json')

@app.route('/fuzzbot/api/get_questions', methods=['GET'])
def get_current_data():
    return jsonify(quiz_data)

@app.route('/fuzzbot/api/get_answers', methods=['GET'])
def get_answer_data():
    answer_data = json.load(open(answer_url))
    return jsonify(answer_data)
