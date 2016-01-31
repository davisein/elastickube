import os

from tornado.web import RequestHandler
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

class MainHandler(RequestHandler):
    def get(self):
        mongo_url = "mongodb://{0}:{1}/".format(
            os.getenv('ELASTICKUBE_MONGO_SERVICE', 'localhost'),
            os.getenv('ELASTICKUBE_MONGO_SERVICE_PORT', 27017)
        )

        client = MongoClient(mongo_url)
        try:
            if client.elastickube:
                self.write("Connected to MongoDB")
        except ConnectionFailure as error:
            self.write("Connection to MongoDB failed: %s" % error)