from quiz_taker import app, send_from_directory, jsonify, request

##################################################
# POST Requests
##################################################

@app.route('/api/send_quiz', methods=['POST'])
def send_quiz():
    return jsonify(request.form)
