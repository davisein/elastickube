import os
import sys
import logging

from tornado.web import Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.netutil import bind_unix_socket
from motor.motor_tornado import MotorClient

from api.v1 import ApiHandlers

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

if __name__ == "__main__":
    mongo_url = "mongodb://{0}:{1}/".format(
        os.getenv('ELASTICKUBE_MONGO_SERVICE_HOST', 'localhost'),
        os.getenv('ELASTICKUBE_MONGO_SERVICE_PORT', 27017)
    )

    settings = dict(
        autoreload  = True,
        database    = MotorClient(mongo_url).elastickube,
        secret      = "ElasticKube",
        google_oauth = dict(
            key             = "726336950247-p6172q2aojfuntnp8e0rocg45c19ss4b.apps.googleusercontent.com",
            secret          = "dmr77iW9Z6e9ZSJvFmuv541g",
            redirect_uri    = "http://elastickube.internal.elasticbox.com/api/v1/auth/google"
        )
    )

    application = Application(ApiHandlers, **settings)

    server = HTTPServer(application)
    socket = bind_unix_socket("/var/run/elastickube-api.sock", mode=0777)
    server.add_socket(socket)

    IOLoop.instance().start()
