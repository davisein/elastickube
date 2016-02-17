import os
import sys
import logging

from motor.motor_tornado import MotorClient
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.netutil import bind_unix_socket
from tornado.web import Application

from api.kube import client
from api.v1.main import MainWebsocketHandler
from api.v1.auth import AuthProvidersHandler, SignupHandler, PasswordHandler, GoogleOAuth2LoginHandler

from db import watch
from db import initialize as db_initialize

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

if __name__ == "__main__":
    mongo_url = "mongodb://{0}:{1}/".format(
        os.getenv('ELASTICKUBE_MONGO_SERVICE_HOST', 'localhost'),
        os.getenv('ELASTICKUBE_MONGO_SERVICE_PORT', 27017)
    )

    db_initialize(mongo_url)
    service_token = None
    if os.path.exists('/var/run/secrets/kubernetes.io/serviceaccount/token'):
        with open('/var/run/secrets/kubernetes.io/serviceaccount/token') as token:
            service_token = token.read()

    motor_client = MotorClient(mongo_url)
    settings = dict(
        autoreload=True,
        database=motor_client.elastickube,
        kube=client.KubeClient(os.getenv('KUBERNETES_SERVICE_HOST'), token=service_token),
        service_token=service_token,
        secret="ElasticKube",
        google_oauth=dict(
            key="726336950247-p6172q2aojfuntnp8e0rocg45c19ss4b.apps.googleusercontent.com",
            secret="dmr77iW9Z6e9ZSJvFmuv541g",
            redirect_uri="http://elastickube.internal.elasticbox.com/api/v1/auth/google"
        )
    )

    handlers = [
        (r"/api/v1/auth/providers", AuthProvidersHandler),
        (r"/api/v1/auth/signup", SignupHandler),
        (r"/api/v1/auth/login", PasswordHandler),
        (r"/api/v1/auth/google", GoogleOAuth2LoginHandler),
        (r"/api/v1/ws", MainWebsocketHandler)
    ]

    application = Application(handlers, **settings)

    server = HTTPServer(application)
    socket = bind_unix_socket("/var/run/elastickube-api.sock", mode=0777)
    server.add_socket(socket)

    watch.start_monitor(motor_client)
    IOLoop.current().start()
