import jwt
import logging

from tornado.gen import coroutine
from tornado.web import RequestHandler, HTTPError


ELASTICKUBE_TOKEN_HEADER = "ElasticKube-Token"

class AuthenticationHandler():

    def __init__(self, application, request, **kwargs):
        self.user = None

    @coroutine
    def authenticate(self):
        try:
            # Try the header if not the cookie
            encoded_token = self.request.headers.get(ELASTICKUBE_TOKEN_HEADER)
            if encoded_token is None:
                encoded_token = self.get_cookie(ELASTICKUBE_TOKEN_HEADER)

            if encoded_token is None:
                raise HTTPError(401, "Invalid token.")

            token = jwt.decode(encoded_token, self.settings['secret'], algorithm='HS256')
            self.user = yield self.settings["database"].Users.find_one({"username": token["username"]})

            if self.user is None:
                logging.debug("User not found.")
                raise HTTPError(401, "Invalid token.")

        except jwt.DecodeError as e:
            logging.debug("The token could not decoded.")
            raise HTTPError(401, "Invalid token.")


class SecureHandler(RequestHandler, AuthenticationHandler):

    @coroutine
    def prepare(self):
        yield self.authenticate()



