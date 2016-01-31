import os

from tornado.web import Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.netutil import bind_unix_socket
from motor.motor_tornado import MotorClient

from v1 import MainHandler


if __name__ == "__main__":
    mongo_url = "mongodb://{0}:{1}/".format(
        os.getenv('ELASTICKUBE_MONGO_SERVICE', 'localhost'),
        os.getenv('ELASTICKUBE_MONGO_SERVICE_PORT', 27017)
    )

    settings = dict(
        autoreload = True,
        client = MotorClient(mongo_url)
    )

    application = Application(
        [
            (r"/api/v1", MainHandler)
        ],
        **settings)

    server = HTTPServer(application)
    socket = bind_unix_socket("/var/run/elastickube-api.sock", mode=0777)
    server.add_socket(socket)

    IOLoop.instance().start()
