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

- `frontend/index.html`: homepage; shows the quiz
- `frontend/results.html`: shows results from the quiz

#### Configs

- `frontend/config/answer_data.json`: the data given to the client with all previously-guessed Qs and As
- `frontend/config/quiz_data.json`: the bank of questions and their correct answers

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
├── gets.py
├── posts.py
├── statics.py
│
└── frontend
    ├── index.html
    ├── results.html
    ├── package.json
    ├── README.md
    │
    ├── config
    │   ├── answer_data.json
    │   └── quiz_data.json
    ├── css
    │   ├── main.css
    │   ├── normalize.css
    │   └── skeleton.css
    └── js
        ├── generate_questions.js
        ├── results.js
        └── take_quiz.js
```

