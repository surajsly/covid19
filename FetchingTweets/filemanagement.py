import json

search_term = ['covid19', 'covid', 'lockdown']

with open('covid19.json', 'r') as f:
    data = json.load(f)
    for t in data:
        try:
            print(t,end="\n\n")
        except:
            pass
        
