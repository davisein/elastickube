import jwt
import json

from datetime import datetime, timedelta
from tornado.auth import GoogleOAuth2Mixin, OAuth2Mixin
from tornado.web import RequestHandler, HTTPError, asynchronous
from tornado.gen import coroutine

from v1.secure import ELASTICKUBE_TOKEN_HEADER


class AuthHandler(RequestHandler):

    @coroutine
    def authenticate_user(self, user):
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

class PasswordHandler(AuthHandler):

    @coroutine
    def get(self):
        username = self.get_argument('username')
        password = self.get_argument('password')

        user = yield self.settings["database"].Users.find_one({ "username": username})

        if user and user["password"] == password:
            self.authenticate_user(user)
        else:
            raise HTTPError(401, "Invalid username or password.")


class GoogleOAuth2LoginHandler(AuthHandler, GoogleOAuth2Mixin):

    @coroutine
    def get(self):
        google_oauth = self.settings.get('google_oauth', False)
        code = self.get_argument('code', False)

        if code:
            auth_data = yield self.get_authenticated_user(
                redirect_uri=google_oauth['redirect_uri'],
                code=code)

            auth_user = yield self.oauth2_request(
                "https://www.googleapis.com/oauth2/v1/userinfo",
                access_token=auth_data['access_token'])

            if auth_user["verified_email"]:
                user = yield self.settings["database"].Users.find_one({"email": auth_user["email"]})
                if user:
                    self.authenticate_user(user)
                else:
                    raise HTTPError(400, "Invalid authentication request.")
            else:
                raise HTTPError(400, "Email is not verified.")
        else:
            yield self.authorize_redirect(
                redirect_uri=google_oauth['redirect_uri'],
                client_id=google_oauth['key'],
                scope=['profile', 'email'],
                response_type='code',
                extra_params={'approval_prompt': 'auto'})
