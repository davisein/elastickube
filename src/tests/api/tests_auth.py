import json
import logging

from tornado import testing
from tornado.httpclient import HTTPError

from tests.api import ApiAsyncTestCase


class AuthTests(ApiAsyncTestCase):

    def setUp(self):
        super(AuthTests, self).setUp()
        self.login_url = self.base_url + '/api/v1/login'

    @testing.gen_test
    def test_missing_username(self):
        logging.debug('Start test_missing_username')

        error = None
        try:
            yield self.http_client.fetch(
                self.login_url,
                method='POST',
                body=json.dumps(dict(password='fake'))
            )
        except HTTPError as e:
            error = e

        assert error, 'Call did not raise error'
        assert error.code == 400, 'Did not raise 400 error code'
        assert 'Missing username in body request' in error.response.body, 'Did not raise expected error message'

        logging.debug('Completed test_missing_username')

    @testing.gen_test
    def test_missing_password(self):
        logging.debug('Start test_missing_password')

        error = None
        try:
            yield self.http_client.fetch(
                self.login_url,
                method='POST',
                body=json.dumps(dict(username='test'))
            )
        except HTTPError as e:
            error = e

        assert error, 'Call did not raise error'
        assert error.code == 400, 'Did not raise 400 error code'
        assert 'Missing password in body request' in error.response.body, 'Did not raise expected error message'

        logging.debug('Completed test_missing_password')

    @testing.gen_test
    def test_fake_user(self):
        logging.debug('Start test_fake_user')

        error = None
        try:
            yield self.http_client.fetch(
                self.login_url,
                method='POST',
                body=json.dumps(dict(username='fake', password='fake'))
            )
        except HTTPError as e:
            error = e

        assert error, 'Call did not raise error'
        assert error.code == 401, 'Did not raise 401 error code'
        assert 'Invalid username or password.' in error.response.body, 'Did not raise expected error message'

        logging.debug('Completed test_fake_user')

    @testing.gen_test
    def test_login_admin(self):
        logging.debug('Start test_login_admin')

        yield self.http_client.fetch(
            self.login_url,
            method='POST',
            body=json.dumps(dict(username='operations@elasticbox.com', password='elastickube'))
        )

        logging.debug('Completed test_login_admin')

if __name__ == '__main__':
    testing.main()
