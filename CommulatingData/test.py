import csv
import json

pos=0
neg=0
nut=0

with open('corona_tweets_30.csv') as csv_file:
    csv_reader=csv.DictReader(csv_file)
    line_count=0;
    for row in csv_reader:
        print(line_count)
        d=row.values()
        for i in d:
            if float(i)<=1 and float(i)>=-1:
                val = float(i)
                if val>0:
                    pos+=1
                elif val<0:
                    neg+=1
                elif val==0:
                    nut+=1
        line_count+=1
        if line_count>=10000:
            break;
    print("positive :",pos,"negative:",neg,"nuteral :",nut,"total:",line_count)        
    pos=(pos/line_count)*100
    neg=(neg/line_count)*100
    nut=(nut/line_count)*100
date=str(input("enter date:yyyy-mm-dd"))        
        

def write_json(data, filename='data.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 
      
      
with open('data.json') as json_file: 
    data = json.load(json_file) 
      
    temp = data['data'] 
  
   
    dic={"date":date,
         "positive":pos,
         "negative":neg,
         "neutral":nut}

  
    # appending data to emp_details  
    temp.append(dic) 
      
write_json(data)  
