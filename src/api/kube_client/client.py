import json
import logging

from tornado.gen import coroutine, Return
from tornado.httpclient import AsyncHTTPClient, HTTPError, HTTPRequest
from tornado.httputil import url_concat

from api.kube_client import exceptions
from api.kube_client.events import Events
from api.kube_client.namespaces import Namespaces
from api.kube_client.pods import Pods
from api.kube_client.replication_controllers import ReplicationControllers
from api.kube_client.services import Services


class HTTPClient(object):

    def __init__(self, server, username, password, version='v1'):
        self.server = server
        self.username = username
        self.password = password
        self.version = version

        self._client = self.build_client()
        self._base_url = 'http://{0}/api/{1}'.format(self.server, self.version)

    def build_client(self):
        defaults = dict(validate_cert=False)
        if self.username and self.password:
            defaults['auth_username'] = self.username
            defaults['auth_password'] = self.password

        return AsyncHTTPClient(force_instance=True,
                               defaults=defaults)

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
        params = self.build_params(url_path, **kwargs)
        url = url_concat(self.build_url(url_path, **kwargs), params)
        request = HTTPRequest(url=url, method='GET', streaming_callback=on_data)
        yield self._client.fetch(request)


class Client(object):

    def __init__(self, endpoint, username=None, password=None, version='v1'):
        self.version = version
        self.http_client = HTTPClient(endpoint, username, password)

        self.events = Events(self)
        self.namespaces = Namespaces(self)
        self.pods = Pods(self)
        self.replication_controllers = ReplicationControllers(self)
        self.services = Services(self)

    def format_error(self, error):
        error_message = error.response.body
        error_method = error.response.request.method
        error_url = error.response.effective_url

        if error_message:
            return "{0} {1} returned {2}: {3}".format(error_method, error_url, error.code, error_message)
        else:
            return "{0} {1} returned {2}".format(error_method, error_url, error.code)

    @coroutine
    def get(self, url_path, **kwargs):
        try:
            response = yield self.http_client.get(url_path, **kwargs)
        except HTTPError as e:
            logging.exception(e)
            message = self.format_error(e)

            if e.code == 404:
                raise exceptions.NotFoundException(message)
            else:
                raise exceptions.KubernetesException(message, e.code)

        data = json.loads(response.body)
        if isinstance(data, dict) and 'items' in data:
            raise Return(data.get('items', []))
        else:
            raise Return(data)

    @coroutine
    def put(self, url_path, **kwargs):
        try:
            response = yield self.http_client.put(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise exceptions.NotFoundException(message)
            else:
                raise exceptions.KubernetesException(message, e.code)

        data = json.loads(response.body)
        raise Return(data)

    @coroutine
    def post(self, url_path, **kwargs):
        try:
            response = yield self.http_client.post(url_path, **kwargs)
        except HTTPError as e:
            raise exceptions.KubernetesException(self.format_error(e), e.code)

        data = json.loads(response.body)

        if isinstance(data, dict) and 'items' in data:
            raise Return(data.get('items', []))
        else:
            raise Return(data)

    @coroutine
    def delete(self, url_path, **kwargs):
        try:
            response = yield self.http_client.delete(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise exceptions.NotFoundException(message)
            else:
                raise exceptions.KubernetesException(message, e.code)

        data = json.loads(response.body)
        raise Return(data)

    @coroutine
    def patch(self, url_path, **kwargs):
        try:
            response = yield self.http_client.patch(url_path, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise exceptions.NotFoundException(message)
            else:
                raise exceptions.KubernetesException(message, e.code)

        data = json.loads(response.body)
        raise Return(data)

    @coroutine
    def watch(self, url_path, on_data, **kwargs):
        try:
            yield self.http_client.watch(url_path, on_data, **kwargs)
        except HTTPError as e:
            message = self.format_error(e)

            if e.code == 404:
                raise exceptions.NotFoundException(message)
            elif e.code == 599:
                raise exceptions.WatchDisconnectedException(message)
            else:
                raise exceptions.KubernetesException(message, e.code)
