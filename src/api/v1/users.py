import json

from bson.json_util import dumps
from tornado.gen import coroutine
from tornado.web import HTTPError

from api.v1.secure import SecureRequestHandler


class UsersHandler(SecureRequestHandler):

    @coroutine
    def get(self, user_id=None):
        selector = {}
        if user_id:
            selector = {'_id': user_id}

        users = []
        cursor = self.settings["database"].Users.find(selector)
        while (yield cursor.fetch_next):
            users.append(cursor.next_object())

        if user_id and len(users) == 0:
            raise HTTPError(404, reason='User not found')

        self.write(dumps(dict(users=users)))
        self.set_header("Content-Type", "application/json")

    @coroutine
    def post(self):
        data = json.loads(self.request.body)
        result = yield self.settings["database"].Users.insert(data)
        self.write(result)

    @coroutine
    def put(self, user_id):
        data = json.loads(self.request.body)
        result = yield self.settings["database"].Users.update({'_id': user_id}, data)
        self.write(result)

    @coroutine
    def delete(self, user_id):
        result = yield self.settings["database"].Users.delete({'_id': user_id})
        self.write(result)
