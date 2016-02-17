import json
import logging

from tornado.gen import coroutine, sleep
from api.v1 import SecureWebSocketHandler
from api.v1.watchers.namespaces import NamespacesWatcher
from api.v1.watchers.instances import InstancesWatcher
from api.v1.watchers.users import UsersWatcher

actions_lookup = dict(

)

watch_lookup = dict(
    nasmespaces=NamespacesWatcher,
    instances=InstancesWatcher,
    users=UsersWatcher
)

class MainWebsocketHandler(SecureWebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(MainWebsocketHandler, self).__init__(application, request, **kwargs)

        self.connected = False
        self.global_watchers = []
        self.current_watcher = None

    @coroutine
    def open(self):
        logging.info("Initializing NamespacesHandler")

        try:
            #yield super(MainWebsocketHandler, self).open()

            ns_watcher = NamespacesWatcher(None, self.settings, self.write_message)
            self.global_watchers.append(ns_watcher)

        except Exception as e:
            logging.exception(e)
            if self.connected:
                self.write_message({"error": {"message": "Failed to connect to event source."}})

    def on_message(self, message):
        msg = json.loads(message)

        if 'action' in msg:
            pass
        elif 'watch' in msg:
            if self.current_watcher:
                self.current_watcher.close()

            watcher_cls = watch_lookup.get(msg['watch'], None)

            if watcher_cls:
                self.current_watcher = watcher_cls(msg, self.settings, self.write_message)
            else:
                self.write_message({"error": {"message": "Watcher not supported."}})

        if "close" in message:
            self.close()

    @coroutine
    def on_close(self):
        logging.info("Closing NamespacesHandler")

        for watcher in self.global_watchers:
            watcher.close()

        if self.current_watcher:
            self.current_watcher.close()

        yield super(MainWebsocketHandler, self).on_close()
