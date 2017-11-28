#!flask/bin/python
from flask import Flask, request, send_from_directory, \
        jsonify, make_response, redirect
import os
import json

app = Flask(__name__)

# Routes
import quiz_taker.statics

import quiz_taker.gets

import quiz_taker.posts

# Scaffolding
if __name__ == '__main__':
    app.run(debug=True)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found, yo'}), 404)

