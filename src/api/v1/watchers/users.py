import logging

from tornado.gen import coroutine, Return

from api.db import watch


class UsersWatcher(object):

    def __init__(self, message, kubeclient, callback):
        logging.info("Initializing UsersWatcher")

        self.callback = callback
        watch.watch_users(self.data_callback)

    @coroutine
    def data_callback(self, data):
        logging.info("Data")
        self.callback(data)

        raise Return()

    def close(self):
        logging.info("Closing UsersWatcher")
        watch.remove_callback(self.data_callback)
