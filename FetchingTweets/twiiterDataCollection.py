import tweepy
import csv
import pandas as pd
from monkeylearn import MonkeyLearn

####input your credentials here
consumer_key = 'OCzHNSy4XIfU6ycXwOVEdkdrl'
consumer_secret = 'U6fkKqVBvqd6in5jhy2bOzm8Tfu1AvQFeAQGxYxDshTsNVAxzP'
access_token = '1123252666899898368-oLGXzOjl2ocA8jVqe7EmaliuS51R68'
access_token_secret = 'Y68W1lbrlzIXwnk4HzQO3SJOEbnVxHtEqqcNZUTdTzqko'
tweetsPerQry = 5
maxTweets = 10
hashtag = "#covid19"
listOfTweets=[]
authentication = tweepy.OAuthHandler(consumer_key, consumer_secret)
authentication.set_access_token(access_token, access_token_secret)
api = tweepy.API(authentication, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
maxId = -1
tweetCount = 0
while tweetCount < maxTweets:
        if(maxId <= 0):
                newTweets = api.search(q=hashtag, count=tweetsPerQry, result_type="recent", tweet_mode="extended")
        else:
                newTweets = api.search(q=hashtag, count=tweetsPerQry, max_id=str(maxId - 1), result_type="recent", tweet_mode="extended")

        if not newTweets:
                print("Tweet Habis")
                break
        
        for tweet in newTweets:
                if tweet.lang == "en":
                    print(type(tweet.full_text))
                    listOfTweets.append(tweet.full_text.encode('unicode-escape').decode('utf-8'))
                
        tweetCount += len(newTweets)	
        maxId = newTweets[-1].id


print("data facthing done")
print(type(listOfTweets[0]))

ml = MonkeyLearn('9639517fd958dd5bac3eeb17cd5a31c0a0cee7bf')
#data = [listOfTweets[0]]
response = ml.classifiers.classify(
    model_id = 'cl_pi3C7JiL',
    data=listOfTweets   
)
print(type(response.body))
for r in response.body:
    print(r)
    print(r['text'])
    print(r["classifications"][0]["tag_name"])
    print(r["classifications"][0]["confidence"])
    print()


