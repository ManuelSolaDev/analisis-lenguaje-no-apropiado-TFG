import sys 
import json
import tweepy

# x = {
#    "sum": int(sys.argv[1]) + int(sys.argv[2]) 
# }

usu = sys.argv[1]

auth = tweepy.AppAuthHandler('5YBQ8MIZRFvWp95rndK2BBJyq', 'nWq63Jpyi3cMEAfLbRBfW4kNe1Ztync1QAvzHXwfNJ6GhaCFMo')
api = tweepy.API(auth)

print(api.get_user(usu).profile_image_url_https)
exit()

