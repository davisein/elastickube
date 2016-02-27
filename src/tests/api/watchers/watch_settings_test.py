"""
ElasticBox Confidential
Copyright (c) 2016 All Right Reserved, ElasticBox Inc.

NOTICE:  All information contained herein is, and remains the property
of ElasticBox. The intellectual and technical concepts contained herein are
proprietary and may be covered by U.S. and Foreign Patents, patents in process,
and are protected by trade secret or copyright law. Dissemination of this
information or reproduction of this material is strictly forbidden unless prior
written permission is obtained from ElasticBox
"""

import json
import logging
import uuid

from tornado import testing
from tornado.httpclient import HTTPRequest
from tornado.websocket import websocket_connect

from tests.api import get_token, wait_message, ELASTICKUBE_TOKEN_HEADER


class WatchSettingsTest(testing.AsyncTestCase):

    _multiprocess_can_split_ = True

    @testing.gen_test(timeout=60)
    def watch_settings_test(self):
        logging.debug("Start watch_settings_test")

        token = yield get_token(self.io_loop)
        request = HTTPRequest(
            "ws://localhost/api/v1/ws",
            headers=dict([(ELASTICKUBE_TOKEN_HEADER, token)]),
            validate_cert=False
        )

        connection = yield websocket_connect(request)

        correlation = str(uuid.uuid4())[:10]
        connection.write_message(json.dumps({
            "action": "settings",
            "operation": "watch",
            "correlation": correlation
        }))

        deserialized_message = yield wait_message(connection, correlation)
        self.assertTrue(deserialized_message["status_code"] == 200,
                        "Status code is %d instead of 200" % deserialized_message["status_code"])
        self.assertTrue(deserialized_message["correlation"] == correlation,
                        "Correlation is %s instead of %s" % (deserialized_message["correlation"], correlation))
        self.assertTrue(deserialized_message["operation"] == "watched",
                        "Operation is %s instead of watched" % deserialized_message["operation"])
        self.assertTrue(deserialized_message["action"] == "settings",
                        "Action is %s instead of settings" % deserialized_message["action"])
        self.assertTrue(isinstance(deserialized_message["body"], list),
                        "Body is not a list but %s" % type(deserialized_message["body"]))
        self.assertTrue(len(deserialized_message["body"]) > 0, "No Settings returned as part of the response")
        self.assertTrue(len(deserialized_message["body"]) < 2, "Multiple Settings returned as part of the response")

        correlation = str(uuid.uuid4())[:10]
        connection.write_message(json.dumps({
            "action": "settings",
            "operation": "watch",
            "correlation": correlation
        }))

        deserialized_message = yield wait_message(connection, correlation)
        self.assertTrue(deserialized_message["status_code"] == 400,
                        "Status code is %d instead of 400" % deserialized_message["status_code"])
        self.assertTrue(deserialized_message["correlation"] == correlation,
                        "Correlation is %s instead of %s" % (deserialized_message["correlation"], correlation))
        self.assertTrue(deserialized_message["operation"] == "watched",
                        "Operation is %s instead of watched" % deserialized_message["operation"])
        self.assertTrue(deserialized_message["action"] == "settings",
                        "Action is %s instead of settings" % deserialized_message["action"])
        self.assertTrue(isinstance(deserialized_message["body"], dict),
                        "Body is not a dict but %s" % type(deserialized_message["body"]))
        self.assertTrue(deserialized_message["body"]["message"] == "Action already watched.",
                        "Message is %s instead of 'Action already watched.'" % deserialized_message["body"]["message"])

        correlation = str(uuid.uuid4())[:10]
        connection.write_message(json.dumps({
            "action": "settings",
            "operation": "unwatch",
            "correlation": correlation
        }))

        deserialized_message = yield wait_message(connection, correlation)
        self.assertTrue(deserialized_message['status_code'] == 200,
                        "Status code is %d instead of 200" % deserialized_message['status_code'])
        self.assertTrue(deserialized_message["correlation"] == correlation,
                        "Correlation is %s instead of %s" % (deserialized_message["correlation"], correlation))
        self.assertTrue(deserialized_message['operation'] == "unwatched",
                        "Operation is %s instead of unwatched" % deserialized_message['operation'])
        self.assertTrue(deserialized_message['action'] == "settings",
                        "Action is %s instead of settings" % deserialized_message['action'])
        self.assertTrue(isinstance(deserialized_message['body'], dict),
                        "Body is not a dict but %s" % type(deserialized_message['body']))
        self.assertTrue(len(deserialized_message['body'].keys()) == 0, "Body is not empty")

        connection.close()
        logging.debug("Completed watch_settings_test")


if __name__ == '__main__':
    testing.main()
