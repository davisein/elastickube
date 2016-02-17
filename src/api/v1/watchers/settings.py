import json
import logging

from bson.json_util import dumps
from tornado.gen import coroutine
from tornado.web import RequestHandler, HTTPError

from api.db.query import Query
from api.v1.secure import SecureRequestHandler


class SettingsHandler(SecureRequestHandler):
    SUPPORTED_METHODS = ('GET', 'POST', 'PUT')

    @coroutine
    def prepare(self):
        try:
            yield super(SettingsHandler, self).prepare()
        except HTTPError as e:
            if e.code == 401:
                logging.debug("Accessing /api/v1/settings without being authenticated")

            raise

    @coroutine
    def get(self):
        settings = yield Query(self.settings["database"], "Settings").find_one()
        if not self.user or self.user["role"] != "administrator":
            settings["authentication"]["google_oauth"] = {
                "enabled": settings["authentication"]["google_oauth"]["enabled"]
            }

        self.write(dumps(dict(settings=settings)))
        self.set_header("Content-Type", "application/json")

    @coroutine
    def post(self):
        if self.user["role"] != "administrator":
            raise HTTPError(401, "Only administrator can perform POST request on /api/v1/settings")

        data = json.loads(self.request.body)

    @coroutine
    def put(self):
        if self.user["role"] != "administrator":
            raise HTTPError(401, "Only administrator can perform PUT request on /api/v1/settings")

        data = json.loads(self.request.body)