from tornado.web import RequestHandler
from pymongo.errors import ConnectionFailure

from api.v1.auth import PasswordHandler, GoogleOAuth2LoginHandler
from api.v1.namespaces import NamespacesHandler
from api.v1.instances import InstancesHandler


class MainHandler(RequestHandler):

    def get(self):
        try:
            if self.settings["client"].elastickube:
                self.write("Connected to MongoDB")
        except ConnectionFailure as error:
            self.write("Connection to MongoDB failed: %s" % error)

        self.finish()


ApiHandlers = [
    (r"/api/v1", MainHandler),
    (r"/api/v1/login", PasswordHandler),
    (r"/api/v1/auth/google", GoogleOAuth2LoginHandler),
    (r"/api/v1/namespaces", NamespacesHandler),
    (r"/api/v1/namespaces/(.*)/instances", InstancesHandler)
]
