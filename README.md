<img alt="FuzzBot Logo" align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Robot_icon.svg/768px-Robot_icon.svg.png" width="400px" />

# FuzzBot

Sam Messina

Dan Jensen

_FuzzBot is an automatic online quiz taker._

## Table of Contents

1. [Installing](#installing)
2. [Running](#running)
3. [Architecture And Code Organization](#architecture-and-code-organization)
3. [File Tree](#file-tree)

## Installing

1. Make sure you have [Python+pip](https://www.python.org/downloads/) and [Node+NPM](https://nodejs.org/en/download/) installed! 
2. Next, run `make install` to install Flask and the requisite NPM packages.

You are now ready to run the program.

## Running

To run the project, simply run `make`.

Open up [localhost:5000](http://localhost:5000/) to view the project.

## Architecture And Code Organization

Everything is in the quiz_taker directory

### General Files
- `Makefile`: handles install and run commands
- `setup.py`: module information for our backend

### Flask Files

- `__init.py__`: entry point for flask
- `gets.py`: get requests
- `posts.py`: post requests
- `statics.py`: static asset rendering

### Front End Files

#### Views

- `frontend/views/index.html`: homepage
- `frontend/views/test.html`: shows the quiz
- `frontend/views/results.html`: shows results from the quiz
- `frontend/views/about.html`: information about the project

#### Configs

- `frontend/config/answer_data.json`: the data given to the client with all previously-guessed Qs and As
- `frontend/config/quiz_data.json`: the bank of questions and their correct answers

#### Assets

- `frontend/assets/robot.png`: image used for the robot

#### JS 

- `frontend/js/generate_questions.js`: create the HTML questions from the JSON question bank
- `frontend/js/results.js`: populate the data on the results page with the most recent results
- `frontend/js/take_quiz.js`: the "bot" that takes the quizzes
- `frontend/js/fuse.min.js`: our fuzzy search library

#### CSS 

- `frontend/css/main.css`: A little basic CSS overrides. Most CSS is from the [Skeleton](http://getskeleton.com/) framework.

#### Assets

- `frontend/assets/robot.png`: the image of a robot, licensed in the public domain

## File Tree

```
.
├── Makefile
├── README.md
├── setup.py
└── quiz_taker
    ├── gets.py
    ├── __init__.py
    ├── posts.py
    ├── statics.py
    └── frontend
        ├── package.json
        ├── assets
        │   └── robot.png
        ├── config
        │   ├── answer_data.json
        │   └── quiz_data.json
        ├── css
        │   └── main.css
        ├── js
        │   ├── fuse.min.js
        │   ├── generate_questions.js
        │   ├── results.js
        │   └── take_quiz.js
        └── views
            ├── about.html
            ├── index.html
            ├── results.html
            └── test.html
```

