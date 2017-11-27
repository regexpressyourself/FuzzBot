from quiz_taker import app, send_from_directory, jsonify, os, json

##################################################
# GET Requests
##################################################

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT, 'frontend/config', 'quiz_data.json')
quiz_data = json.load(open(json_url))

json_url = os.path.join(SITE_ROOT, 'frontend/config', 'answer_data.json')
answer_data = json.load(open(json_url))

@app.route('/api/get_questions', methods=['GET'])
def get_current_data():
    return jsonify(quiz_data)

@app.route('/api/get_answers', methods=['GET'])
def get_answer_data():
    return jsonify(answer_data)
