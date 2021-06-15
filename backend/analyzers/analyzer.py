import sys 
import json
import os
import keras
import keras.models
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

from keras.models import model_from_json
# load json and create model
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")
print("Loaded model from disk")

def readFile(fileName):
        fileObj = open(fileName, "r") #opens the file in read mode
        words = fileObj.read().splitlines() #puts the file into an array
        fileObj.close()
        return words

text_file = open("sentences_train.txt", "r", encoding="utf8")
lines = text_file.readlines()

print(len(lines))
text_file.close()

vectorizer = CountVectorizer()
vectorizer.fit(lines)

#max_index = number_list.index(max_value)
prediction = loaded_model.predict(vectorizer.transform([sys.argv[1]]))

print(np.argmax(prediction))



#print(loaded_model.predict(vectorizer.transform([sys.argv[1]])))

exit()
#import tweepy

# x = {
#    "sum": int(sys.argv[1]) + int(sys.argv[2]) 
# }






#tweetTexto = sys.argv[1]
#from random import seed
#from random import random
#value = random()
#print(value)








# seed random number generator

# generate random numbers between 0-1



#tweets = ['Feo', 'Inutil', 'Se cree que la luna está aún más lejos']

#print (tweets[0])

#exit()



#print(resPuestaAnalyzer)