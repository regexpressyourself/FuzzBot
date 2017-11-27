import json
import pyperclip
import time
import codecs
html_file = codecs.open("tests.html", "r",encoding='utf-8', errors='ignore')
from pprint import pprint
data_file = codecs.open("results.json", "r",encoding='utf-8', errors='ignore')

results = data_file.read()
if (len(results) > 0):
    results = json.loads(results)
    results = results['questions']
else:
    results = []
global question_array
question_array = results

global final_string
global temp_string 

def getQuestions():
    final_string =""
    temp_string =""
    is_correct = False

    while ("dlay_l" not in temp_string):
        temp = html_file.read(1)
        if (temp == ''):
            return False
        temp_string += temp
    temp_string = ""

    while ("strong>" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""

    while ("<" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    final_string += temp_string[:-1].lstrip()
    final_string += '\n'
    temp_string = ""

    while ("dlay_r" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""

    while ("label>" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""

    while ("<" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    if ("0.25" in temp_string.lstrip()[0:5]):
        is_correct = True
        

    final_string += temp_string[:-1].lstrip()
    final_string += '\n'

    temp_string = ""

    while ("<span" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""

    while (">" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""

    while ("<" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = temp_string.lstrip()[:-1]
    final_string += temp_string
    question = { "question": temp_string, "answers": [], "correct": "", "incorrect": [] }
    for q in question_array:
        if (q["question"] == temp_string):
            question = q
            question_array.remove(q)

    temp_string = ""
    final_string += '\n'
    return_val = getAnswers(question, is_correct)
    i = 0;
    while (return_val):
        new_question = return_val
        i += 1
        return_val = getAnswers(question, is_correct)

    question_array.append(new_question)

    return question_array

def getAnswers(question, correct):
    temp_string = ""
    final_string = ""
    given_answer = False

    t0 = time.time()
    while ('"disabled"' not in temp_string ):
        t1 = time.time()
        temp = html_file.read(1)
        temp_string += temp
        if ('div id="z_' in temp_string):
            return False
        if (temp == ''):
            return False
        if ((t1 - t0) > 10):
            return False

    temp_string = ""

    for i in range(0,10):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    if ("checked" in temp_string):
        final_string += "* "
        given_answer = True
    else:
        final_string += "  "

    temp_string = ""
    while ("<td" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""
    while ("<td>" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""
    while ("&" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = temp_string.lstrip().strip("&") + " "
    final_string += temp_string
    temp_string = ""
    while ("<span" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""
    while (">" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = ""
    while ("</span" not in temp_string):
        temp = html_file.read(1)
        if (temp != ''):
            temp_string += temp
        else:
            break
    temp_string = temp_string[:-6].lstrip()
    final_string += temp_string
    if (given_answer and correct):
        if (question["correct"] != temp_string):
            question["correct"] = temp_string
        else :
            question["correct1"] = temp_string
    elif (given_answer):
        already_logged = False
        for a in question['incorrect']:
            if (a == temp_string):
                already_logged = True
        if (not already_logged):
            question['incorrect'].append(temp_string)

    already_logged = False
    for a in question['answers']:
        
        if (a == temp_string):
            already_logged = True
    if (not already_logged):
        question['answers'].append(temp_string)

    temp_string = ""
    return question

q = getQuestions()

while (q):
    q = getQuestions()

print(question_array);
q_obj = {"questions":question_array}

with open('results.json', 'w') as f:
  json.dump(q_obj, f, ensure_ascii=False)

inputStr = ""
print("\nWaiting...\n")

def ssearch(term):
    print("")
    print("#########################################################")
    print("got term: "+term)
    print("#########################################################")
    print("")
    for  q in question_array:
        if (term in q["question"]):
            if (len(q["correct"]) > 0):
                print("")
                print("====================")
                print("Question: ")
                print(q["question"])
                print("")
                print("Correct answer: ")
                print(q["correct"])

            elif(len(q["incorrect"]) > 0):
                print("")
                print("====================")
                print("Question: ")
                print(q["question"])
                print("")
                print("Incorrect answer(s): ")
                for a in q["incorrect"]:
                    print(a);

while True:
    outputStr = ""
    oldStr = inputStr
    inputStr = pyperclip.paste()
    if oldStr != inputStr:
        pyperclip.copy(inputStr)
        ssearch(inputStr)

    else:
        time.sleep(.5)


