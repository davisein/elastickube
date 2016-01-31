import jwt

from util import serialize_datetime
from datetime import datetime, timedelta
from tornado.web import RequestHandler, HTTPError
from tornado.gen import coroutine


class AuthHandler(RequestHandler):

    @coroutine
    def post(self):
        username = self.get_argument('username')
        password = self.get_argument('password')

        user = yield self.settings["client"].elastickube["Users"].find_one({ "username": username})

        if user and user["password"] == password:
            token = dict(
                username    = user["username"],
                firstname   = user["name"],
                lastname    = user["lastname"],
                created     = serialize_datetime(datetime.utcnow()),
                expires     = serialize_datetime(datetime.utcnow() + timedelta(30))
            )

            self.set_cookie(
                "ElasticKube-Token",
                jwt.encode(token, self.settings['secret'], algorithm='HS256')
            )

        else:
            raise HTTPError(401, "Invalid username or password.")
