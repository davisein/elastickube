import logging

from tornado.escape import json_encode
from tornado.gen import coroutine, sleep
from tornado.web import HTTPError
from tornado.websocket import WebSocketHandler

from api.kube_client import client
from api.v1.secure import AuthenticationHandler


class InstancesHandler(WebSocketHandler, AuthenticationHandler):

    def __init__(self, application, request, **kwargs):
        super(InstancesHandler, self).__init__(application, request, **kwargs)

        self.cursor = None
        self.connected = False

    @coroutine
    def open(self,_):
        logging.info("Initializing instances handler.")

        try:
            yield self.authenticate()

            kube = client.Client('10.5.10.6:8080')
            self.connected = True

            while self.connected:
                response = yield kube.pods.get(namespace='default')
                self.write_message(json_encode(response))
                yield sleep(1)

        except HTTPError:
            self.write_message("Authentication failed.")

        except Exception as e:
            logging.exception(e)
            self.write_message("Failed to connect to event source.")

        finally:
            self.close()

    def on_message(self, message):
        if "close" in message:
            self.close()

    @coroutine
    def on_close(self):
        logging.info("Closing InstancesHandler")

        try:
            if self.cursor and self.cursor.alive:
                yield self.cursor.close()
        finally:
            self.cursor = None
            self.connected = False