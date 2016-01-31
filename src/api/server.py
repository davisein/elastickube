from tornado.web import Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.netutil import bind_unix_socket

from v1 import MainHandler


if __name__ == "__main__":
    application = Application(
        [
            (r"/api/v1", MainHandler)
        ],
        autoreload=True)

    server = HTTPServer(application)
    socket = bind_unix_socket("/var/run/elastickube-api.sock", mode=0777)
    server.add_socket(socket)

    IOLoop.instance().start()
