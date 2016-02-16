import logging

from tornado import testing
from tornado.gen import sleep

from tests.api import ApiAsyncTestCase


class NamespacesTests(ApiAsyncTestCase):

    @testing.gen_test
    def test_get_namespaces(self):
        yield sleep(1)


if __name__ == '__main__':
    testing.main()
