import html
filename = "raw_quiz_data.txt"

with open(filename) as f:
    raw_data = f.read()
print(html.unescape(raw_data))
