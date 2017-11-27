import json
import textwrap
import pprint
import codecs

data_file = codecs.open("results.json", "r",encoding='utf-8', errors='ignore')


json_data = json.loads(data_file.read())

global question_array

question_array = json_data["questions"]

have_ans_array = []

for q in question_array:
    if (len(q["correct"]) > 0):
        have_ans_array.append(q)
    elif ((len(q["answers"]) - len(q["incorrect"])) == 1):
        for a in q["answers"]:
            if (a not in q["incorrect"]):
                q["correct"] = a
                have_ans_array.append(q)

q_obj = {"questions":question_array}
with open('results.json', 'w') as f:
  json.dump(q_obj, f, ensure_ascii=False)


for ans in have_ans_array:
    print()
    print("======================================================================")
    print(ans["question"])
    print()
    print(ans["correct"])



                


for ans in have_ans_array:
    print()
    print("======================================================================")
    print(textwrap.fill(ans["question"], 70))
    print()
    for a in ans["answers"]:
        print("- " + a)
    print()
    input("press enter for answer\n")
    print()
    print(ans["correct"])
    input()



                

