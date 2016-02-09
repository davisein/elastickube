import logging

from tornado.escape import json_encode
from tornado.gen import coroutine, sleep

from api.kube_client import client
from api.v1.secure import SecureWebSocketHandler


class InstancesHandler(SecureWebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(InstancesHandler, self).__init__(application, request, **kwargs)

        self.namespace = None
        self.connected = False
        self.controllers = []

    @coroutine
    def open(self, namespace):
        logging.info("Initializing InstancesHandler for namespace '{0}'".format(namespace))

        try:
            yield super(InstancesHandler, self).open()

            self.namespace = namespace

            kube = client.Client('10.5.10.6:8080')

            self.connected = True
            while self.connected:
                response = yield kube.replication_controllers.get(namespace=self.namespace)

                new_controllers = []
                for controller in response:
                    if controller['metadata']['uid'] not in self.controllers:
                        new_controllers.append(controller)
                        self.controllers.append(controller['metadata']['uid'])

                if len(new_controllers) > 0 and self.connected:
                    self.write_message(json_encode(new_controllers))

                yield sleep(1)

        except Exception as e:
            logging.exception(e)
            if self.connected:
                self.write_message("Failed to connect to event source.")

        finally:
            self.close()

    def on_message(self, message):
        if "close" in message:
            self.close()

    @coroutine
    def on_close(self):
        logging.info("Closing InstancesHandler for namespace '{0}'".format(self.namespace))

        self.connected = False
        yield super(InstancesHandler, self).on_close()
