import requests
from bs4 import BeautifulSoup
import csv
url="http://webcache.googleusercontent.com/search?q=cache:https://mohfw.gov.in/&strip=1&vwsrc=0"
page = requests.get(url)
soup = BeautifulSoup(page.content, 'lxml')
data = {}
#Get the table having the class wikitable
table = soup.find("table", attrs={"class": "table"})
print(table)
















#with open('a.csv', 'w', newline='') as f:
#    writer = csv.writer(f)
#    for tr in table('tr'):
#        row = [t.get_text(strip=True) for t in tr(['td', 'th'])]
#        writer.writerow(row)





#table_data = table.tbody.find_all("tr")
#for x in table_data[:2]:
#    print(x.text_content())
#    print('*****************************************************')
#    w=x.find_all("td")
#    print(w)
#      

