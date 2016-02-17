import json
import logging

from tornado.gen import coroutine, Return
from tornado.concurrent import Future, chain_future
from tornado.httpclient import AsyncHTTPClient, HTTPError, HTTPRequest
from tornado.httputil import url_concat

from api.kube.exceptions import KubernetesException, WatchDisconnectedException, NotFoundException
from api.kube.events import Events
from api.kube.namespaces import Namespaces
from api.kube.pods import Pods
from api.kube.replication_controllers import ReplicationControllers
from api.kube.services import Services

AsyncHTTPClient.configure("tornado.curl_httpclient.CurlAsyncHTTPClient")


class HTTPClient(object):

    def __init__(self, server, username, password, token, version='v1'):
        self.server = server
        self.username = username
        self.password = password
        self.token = token
        self.version = version

        self._client = self.build_client()
        self._base_url = 'http://10.5.10.6:8080/api/{1}'.format(self.server, self.version)

    def build_client(self):
        defaults = dict(validate_cert=False)

        if self.token:
            defaults['headers'] = {'Authorization': 'Bearer {0}'.format(self.token)}
        elif self.username and self.password:
            defaults['auth_username'] = self.username
            defaults['auth_password'] = self.password

        return AsyncHTTPClient(force_instance=False, defaults=defaults)

    def build_url(self, url_path, **kwargs):
        if url_path.startswith('/'):
            url = self._base_url + url_path
        else:
            url = self._base_url + '/' + url_path

        params = {
            'namespace': kwargs.pop('namespace', 'default')
        }

        for param in kwargs.iterkeys():
            if param in url_path:
                params[param] = kwargs[param]

        return url.format(**params)

    def build_params(self, url_path, **kwargs):
        if url_path.startswith('/'):
            url = self._base_url + url_path
        else:
            url = self._base_url + '/' + url_path

        keys = kwargs.keys()
        for key in keys:
            if key in url:
                kwargs.pop(key)

        return kwargs

    @coroutine
    def get(self, url_path, **kwargs):
        params = self.build_params(url_path, **kwargs)
        url = url_concat(self.build_url(url_path, **kwargs), params)

        result = yield self._client.fetch(url, method='GET')
        raise Return(result)

    @coroutine
    def post(self, url_path, **kwargs):
        url = self.build_url(url_path, **kwargs)
        params = self.build_params(url_path, **kwargs)

        result = yield self._client.fetch(
            url,
            method='POST',
            headers={'Content-type': 'application/json'},
            **params)

        raise Return(result)

    @coroutine
    def put(self, url_path, **kwargs):
        url = self.build_url(url_path, **kwargs)
        params = self.build_params(url_path, **kwargs)

        result = yield self._client.fetch(
            url,
            method='PUT',
            headers={'Content-type': 'application/json'},
            **params)

        raise Return(result)

    @coroutine
    def delete(self, url_path, **kwargs):
        response = yield self._client.fetch(self.build_url(url_path, **kwargs), method='DELETE')
        raise Return(response)

    @coroutine
    def patch(self, url_path, **kwargs):
        url = self.build_url(url_path, **kwargs)
        params = self.build_params(url_path, **kwargs)

        result = yield self._client.fetch(
            url,
            method='PATCH',
            headers={'Content-Type': 'application/merge-patch+json'},
            **params)

        raise Return(result)

    @coroutine
    def watch(self, url_path, on_data, **kwargs):
        class WatchFuture(Future):
            def cancel(self):
                # close client connection
                pass

        def data_callback(data):
            on_data(json.loads(data))

        params = self.build_params(url_path, **kwargs)
        url = url_concat(self.build_url(url_path, **kwargs), params)

        request = HTTPRequest(url=url, method='GET', request_timeout=3600, streaming_callback=data_callback)
        future = WatchFuture()
        chain_future(self._client.fetch(request), future)

        yield future




class KubeClient(object):

    def __init__(self, endpoint, username=None, password=None, token=None, version='v1'):
        self.version = version
        self.http_client = HTTPClient(endpoint, username, password, token)

        self.events = Events(self)
        self.namespaces = Namespaces(self)
        self.pods = Pods(self)
        self.replication_controllers = ReplicationControllers(self)
        self.services = Services(self)

    def format_error(self, error):
        if error.code != 599:
            error_message = error.response.body
            error_method = error.response.request.method
            error_url = error.response.effective_url

            if error_message:
                return "{0} {1} returned {2}: {3}".format(error_method, error_url, error.code, error_message)
            else:
                return "{0} {1} returned {2}".format(error_method, error_url, error.code)
        else:
            return 'Watch error'

    @coroutine
    def get(self, url_path, **kwargs):
        try:
            response = yield self.http_client.get(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)
            logging.exception(e)
            if e.code == 404:
                raise NotFoundException(message)
            else:
                raise KubernetesException(message, e.code)

        raise Return(json.loads(response.body))

    @coroutine
    def put(self, url_path, **kwargs):
        try:
            response = yield self.http_client.put(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise NotFoundException(message)
            else:
                raise KubernetesException(message, e.code)

        raise Return(json.loads(response.body))

    @coroutine
    def post(self, url_path, **kwargs):
        try:
            response = yield self.http_client.post(url_path, **kwargs)
        except HTTPError as e:
            raise KubernetesException(self.format_error(e), e.code)

        raise Return(json.loads(response.body))

    @coroutine
    def delete(self, url_path, **kwargs):
        try:
            response = yield self.http_client.delete(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise NotFoundException(message)
            else:
                raise KubernetesException(message, e.code)

        raise Return(json.loads(response.body))

    @coroutine
    def patch(self, url_path, **kwargs):
        try:
            response = yield self.http_client.patch(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise NotFoundException(message)
            else:
                raise KubernetesException(message, e.code)

        raise Return(json.loads(response.body))

    @coroutine
    def watch(self, url_path, on_data, **kwargs):
        try:
            yield self.http_client.watch(url_path, on_data, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise NotFoundException(message)
            elif e.code == 599:
                raise WatchDisconnectedException(message)
            else:
                raise KubernetesException(message, e.code)
