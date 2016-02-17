import json
import logging

from tornado import testing
from tornado.httpclient import HTTPError

from tests.api import ApiAsyncTestCase


class UsersTests(ApiAsyncTestCase):

    def setUp(self):
        super(UsersTests, self).setUp()
        self.users_url = self.base_url + '/api/v1/users'

    @testing.gen_test
    def test_get_user(self):
        logging.debug('Start test_get_user')

        response = yield self.get(self.users_url)
        for user in response.get('users', []):
            logging.error(user)

        logging.debug('Completed test_get_user')


if __name__ == '__main__':
    testing.main()
