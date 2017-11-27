all:
	export FLASK_APP=quiz_taker && export FLASK_DEBUG=true && flask run

install: requirements.txt
	pip install -r requirements.txt
