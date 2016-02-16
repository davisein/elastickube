import json
import logging

from tornado.gen import coroutine, sleep

from api.kube.exceptions import WatchDisconnectedException
from api.v1.secure import SecureWebSocketHandler


class NamespacesHandler(SecureWebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(NamespacesHandler, self).__init__(application, request, **kwargs)

        self.connected = False
        self.watchers = {}
        self.watchers_version = {}

    def namespaces_callback(self, data):
        if 'items' in data:
            self.watchers_version['namespaces'] = data['metadata']['resourceVersion']
        else:
            self.watchers_version['namespaces'] = json.loads(data)['object']['metadata']['resourceVersion']

        self.write_message(data)

    @coroutine
    def open(self):
        logging.info("Initializing NamespacesHandler")

        try:
            yield super(NamespacesHandler, self).open()

            self.watchers['namespaces'] = self.settings["kube"].namespaces.watch(on_data=self.namespaces_callback)
            self.connected = True

            while self.connected:
                try:
                    yield self.watchers
                except WatchDisconnectedException as e:
                    yield sleep(1)
                    if e.status_code == 599:
                        self.watchers["namespaces"] = self.settings["kube"].namespaces.watch(
                                on_data=self.namespaces_callback,
                                resource_version=self.watchers_version["namespaces"])

        except Exception as e:
            logging.exception(e)
            if self.connected:
                self.write_message({"error": {"message": "Failed to connect to event source."}})

        finally:
            self.close()

    def on_message(self, message):
        operation = json.loads(message)
        logging.debug(operation)

        if "close" in message:
            self.close()

    @coroutine
    def on_close(self):
        logging.info("Closing InstancesHandler")

        self.connected = False
        yield super(NamespacesHandler, self).on_close()
