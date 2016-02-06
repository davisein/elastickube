import logging
import pymongo

from motor.motor_tornado import MotorClient

from tornado.gen import coroutine, sleep
from tornado.web import HTTPError
from tornado.websocket import WebSocketHandler
from v1.secure import AuthenticationHandler


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

            oplog = MotorClient("mongodb://elastickube-mongo:27017").local["oplog.rs"]
            self.cursor = oplog.find().limit(-1)
            self.connected = True
            last_timestamp = None

            while self.connected:
                if (yield self.cursor.fetch_next):
                        doc = self.cursor.next_object()
                        self.write_message(str(doc))
                        last_timestamp = doc["ts"]

                if self.cursor and not self.cursor.alive:
                    yield sleep(1)

                    logging.debug("Recreating cursor.")
                    self.cursor = oplog.find({ 'ts': {'$gt': last_timestamp} }, tailable=True, await_data=True)
                    self.cursor.add_option(8)

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