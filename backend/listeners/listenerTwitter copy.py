import sys 
import json
import tweepy

# x = {
#    "sum": int(sys.argv[1]) + int(sys.argv[2]) 
# }



auth = tweepy.AppAuthHandler('5YBQ8MIZRFvWp95rndK2BBJyq', 'nWq63Jpyi3cMEAfLbRBfW4kNe1Ztync1QAvzHXwfNJ6GhaCFMo')
api = tweepy.API(auth)


#for tweet in tweepy.Cursor(api.search, q='#mercadona').items(5):
#    print(tweet.text)

new_search = "mercadona -filter:retweets"
#new_search = "mercadona+saludable -filter:retweets"

#new_search = terminos = sys.argv[1] 

tweets = tweepy.Cursor(api.search,
                   q=new_search,
                   lang="es").items(200)

#[print(tweet.text) for tweet in tweets]
#[print({"'texto' : '" +  tweet.text + "'", "'foto' : '" + tweet.user.profile_image_url_https + "'",  "'nombre' : '" +tweet.user.screen_name + "'", "'localizacion' : '" + tweet.user.location + "'"}) for tweet in tweets]
[print({"'texto' : '" +  tweet.text + "'", "'foto' : '" + tweet.user.profile_image_url_https + "'",  "'nombre' : '" +tweet.user.screen_name + "'"}) for tweet in tweets]


#[print({"'texto' : '" +  tweet.text + "'", "'foto' : '" + tweet.user.profile_image_url_https + "'", tweet.user.screen_name, tweet.user.location, tweet.in_reply_to_user_id, tweet.in_reply_to_user_id_str}) for tweet in tweets]

#tweet.text
#tweet.user.profile_image_url_https
#tweet.user.screen_name
#print("Hacemos la llamada a twitter pasandole los params", terminos, fecha)



#print(resPuestaAPITwitter)

#exit()
#print(resPuestaAPITwitter)

