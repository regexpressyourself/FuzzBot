# Quiz Taker

## Installing

Make sure you have Python+pip and Node+NPM installed! 

Next, run `make install` to install Flask and the requisite npm packages.

As far as I know, you should be up and running from there.

## Running

To run the project, simply run `make`.

Open up [localhost:5000](http://localhost:5000/) and you can see her go!

## Architecture/Code Organization

Everything is in the quiz_taker directory

### Flask stuff

- `__init.py__`: entry point for flask
- `gets.py`: get requests
- `posts.py`: post requests
- `statics.py`: static asset rendering

### Front End Stuff

#### Views

- `frontend/views/index.html`: homepage
- `frontend/views/test.html`: shows the quiz
- `frontend/views/results.html`: shows results from the quiz

#### Configs

- `frontend/config/answer_data.json`: the data given to the client with all previously-guessed Qs and As
- `frontend/config/quiz_data.json`: the bank of questions and their correct answers

#### Assets

- `frontend/assets/robot.png`: image used for the robot

#### JS 

- `frontend/js/generate_questions.js`: create the HTML questions from the JSON question bank
- `frontend/js/results.js`: populate the data on the results page with the most recent results
- `frontend/js/take_quiz.js`: the "bot" that takes the quizzes

#### CSS 

- `frontend/css/main.css`: A little basic CSS overrides. Most CSS is from the [Skeleton](http://getskeleton.com/) framework.

### Relevant File Tree

```
.
├── __init__.py
├── statics.py
├── posts.py
├── gets.py
│
└── frontend
    ├── README.md
    ├── package.json
    │
    ├── views
    │   ├── test.html
    │   ├── results.html
    │   └── index.html
    │
    ├── js
    │   ├── take_quiz.js
    │   ├── results.js
    │   └── generate_questions.js
    │
    ├── css
    │   └── main.css
    │
    ├── config
    │   ├── quiz_data.json
    │   └── answer_data.json
    │
    └── assets
        └── robot.png
```

