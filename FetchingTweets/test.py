import tweepy
import json
consumer_key = 'OCzHNSy4XIfU6ycXwOVEdkdrl'
consumer_secret_key = 'U6fkKqVBvqd6in5jhy2bOzm8Tfu1AvQFeAQGxYxDshTsNVAxzP'
access_token = '1123252666899898368-oLGXzOjl2ocA8jVqe7EmaliuS51R68'
access_token_secret = 'Y68W1lbrlzIXwnk4HzQO3SJOEbnVxHtEqqcNZUTdTzqko'
auth = tweepy.OAuthHandler(consumer_key, consumer_secret_key)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

search_terms = ['covid19']

def stream_tweets(search_term):
    data = [] # empty list to which tweet_details obj will be added
    counter = 0 # counter to keep track of each iteration
    for tweet in tweepy.Cursor(api.search, q='\"{}\ " -filter:retweets'.format(search_term), count=1000, lang='en', tweet_mode='extended').items():
        tweet_details = {}
        tweet_details['name'] = tweet.user.screen_name
        tweet_details['tweet'] = tweet.full_text
        tweet_details['retweets'] = tweet.retweet_count
        tweet_details['location'] = tweet.user.location
        tweet_details['created'] = tweet.created_at.strftime("%d-%b-%Y")
        tweet_details['followers'] = tweet.user.followers_count
        tweet_details['is_user_verified'] = tweet.user.verified
        data.append(tweet_details)
        
        counter += 1
        if counter == 1000:
            break
        else:
            pass
    with open('{}.json'.format(search_term), 'w') as f:
        json.dump(data, f)
    print('done!')


if __name__ == "__main__":
    print('Starting to stream...')
    for search_term in search_terms:
        stream_tweets(search_term)
    print('finished!')

    
