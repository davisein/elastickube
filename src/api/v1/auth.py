import logging
from datetime import datetime, timedelta

import jwt
from tornado.auth import GoogleOAuth2Mixin, OAuth2Mixin
from tornado.gen import coroutine
from tornado.web import RequestHandler, HTTPError, asynchronous

from api.v1.secure import ELASTICKUBE_TOKEN_HEADER


class AuthHandler(RequestHandler):

    @coroutine
    def authenticate_user(self, user):
        logging.info("Authenticating user '%s'" % user["username"])

        token = dict(
            id        = str(user["_id"]),
            username  = user["username"],
            firstname = user["firstname"],
            lastname  = user["lastname"],
            email     = user["email"],
            created   = datetime.utcnow().isoformat(),
            expires   = (datetime.utcnow() + timedelta(30)).isoformat()
        )

        user["last_login"] = datetime.utcnow()

        self.set_cookie(
            ELASTICKUBE_TOKEN_HEADER,
            jwt.encode(token, self.settings['secret'], algorithm='HS256')
        )

        self.redirect('/')
        yield self.settings["database"].Users.save(user)
        logging.info("User '%s' authenticated." % user["username"])


class PasswordHandler(AuthHandler):

    @coroutine
    def get(self):
        logging.info("Initiating Password auth.")
        username = self.get_argument('username')
        password = self.get_argument('password')

        user = yield self.settings["database"].Users.find_one({ "username": username})

        if not user:
            logging.debug("Username '%s' not found." % username)
            raise HTTPError(401, "Invalid username or password.")

        if user["password"] == password:
            self.authenticate_user(user)
        else:
            logging.info("Invalid password for user '%'." % username)
            raise HTTPError(401, "Invalid username or password.")


class GoogleOAuth2LoginHandler(AuthHandler, GoogleOAuth2Mixin):

    @coroutine
    def get(self):
        logging.info("Initiating Google OAuth.")

        google_oauth = self.settings.get('google_oauth', False)
        code = self.get_argument('code', False)

        if code:
            logging.debug("Google redirect received.")
            auth_data = yield self.get_authenticated_user(
                redirect_uri=google_oauth['redirect_uri'],
                code=code)

            logging.debug("User Authenticating, getting user info.")
            auth_user = yield self.oauth2_request(
                "https://www.googleapis.com/oauth2/v1/userinfo",
                access_token=auth_data['access_token'])

            if auth_user["verified_email"]:
                logging.debug("Google user email verified.")
                user = yield self.settings["database"].Users.find_one({"email": auth_user["email"]})

                if user:
                    self.authenticate_user(user)
                else:
                    logging.debug("User '%s' not found" % auth_user["email"])
                    raise HTTPError(400, "Invalid authentication request.")
            else:
                logging.info("User email '%s' not verified." % auth_user["email"])
                raise HTTPError(400, "Email is not verified.")
        else:
            logging.debug("Redirecting to google for authentication.")
            yield self.authorize_redirect(
                redirect_uri=google_oauth['redirect_uri'],
                client_id=google_oauth['key'],
                scope=['profile', 'email'],
                response_type='code',
                extra_params={'approval_prompt': 'auto'})
