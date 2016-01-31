import os

from tornado.web import Application, RequestHandler
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.netutil import bind_unix_socket
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

if __name__ == "__main__":
    application = Application([
        (r"/api", MainHandler)
    ])

    server = HTTPServer(application)
    socket = bind_unix_socket("/var/run/elastickube-api.sock", mode=0777)
    server.add_socket(socket)

    IOLoop.current().start()