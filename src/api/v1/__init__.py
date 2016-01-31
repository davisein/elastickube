
from tornado.web import RequestHandler, asynchronous
from pymongo.errors import ConnectionFailure

class MainHandler(RequestHandler):

    @asynchronous
    def get(self):
        try:
            if self.settings["client"].elastickube:
                self.write("Connected to MongoDB")
        except ConnectionFailure as error:
            self.write("Connection to MongoDB failed: %s" % error)

        self.finish()
