from api.kube_client.resources import Resources


class Events(Resources):

    def __init__(self, api):
        super(Events, self).__init__(api, '/namespaces/{namespace}/events')
