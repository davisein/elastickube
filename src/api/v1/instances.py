import json

from tornado.web import RequestHandler, HTTPError
from tornado.gen import coroutine, Return


class InstancesHandler(RequestHandler):

    @coroutine
    def get(self):
        self.write(json.dumps([]))
        Return()
