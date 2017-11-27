all:
	export FLASK_APP=quiz_taker && export FLASK_DEBUG=true && flask run

install: quiz_taker/frontend/package.json
	sudo pip install Flask
	sudo pip install setuptools
	pip install -e .
	cd quiz_taker/frontend && npm install && cd ../../
