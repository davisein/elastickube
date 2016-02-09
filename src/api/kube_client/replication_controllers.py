from api.kube_client.resources import Resources


class ReplicationControllers(Resources):

    def __init__(self, api):
        super(ReplicationControllers, self).__init__(api, '/namespaces/{namespace}/replicationcontrollers')
