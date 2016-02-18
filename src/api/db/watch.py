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
import pymongo
import logging

from bson import json_util
from tornado.gen import coroutine, Return


WATCHABLE_OPERATIONS = ['i', 'u']
WATCHABLE_COLLECTIONS = [
    "elastickube.Users",
    "elastickube.Namespaces"
]

_callbacks = {}


@coroutine
def watch_users(coroutine_callback):
    logging.info("Adding users callback")

    if 'users' not in _callbacks:
        _callbacks['users'] = []

    _callbacks['users'].append(coroutine_callback)

    raise Return()


@coroutine
def remove_callback(coroutine_callback):
    if coroutine_callback in _callbacks['users']:
        logging.info("Removing users callback")
        _callbacks['users'].remove(coroutine_callback)

    raise Return()


@coroutine
def start_monitor(client):
    logging.info("Initializing watcher...")

    try:
        oplog = client["local"]["oplog.rs"]

        cursor = oplog.find().sort('ts', pymongo.DESCENDING).limit(-1)
        if (yield cursor.fetch_next):
            document = cursor.next_object()

            last_timestamp = document['ts']
            logging.info('Watching from timestamp: %s', last_timestamp.as_datetime())
        else:
            last_timestamp = None

        while True:
            if not cursor.alive:
                cursor = oplog.find({
                    'ts': {'$gt': last_timestamp},
                    'op': {'$in': WATCHABLE_OPERATIONS},
                    'ns': {'$in': WATCHABLE_COLLECTIONS}
                }, tailable=True, await_data=True)

                cursor.add_option(8)
                logging.debug('Tailable cursor recreated.')

            if (yield cursor.fetch_next):
                document = cursor.next_object()
                last_timestamp = document['ts']
                yield [
                    _dispatch_users_documents(document['o'])
                ]

    except Exception as e:
        logging.exception(e)


@coroutine
def _dispatch_users_documents(document):
    try:
        if 'username' in document:
            serialized = json.dumps(document, default=json_util.default)

            # Call all the callback in parallel and wait
            results = yield dict(
                [(callback, callback(document, serialized)) for callback in _callbacks['users']]
            )

            # Remove all failed callbacks
            for callback, result in results.iteritems():
                if result and result.exception():
                    yield remove_callback(callback)

    except Exception as e:
        logging.exception(e)
