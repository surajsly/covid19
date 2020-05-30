import requests

url = "https://covid-india-api.herokuapp.com/api"

payload = {}
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("GET", url, headers=headers, data = payload)

print(response.text.encode('utf8'))
