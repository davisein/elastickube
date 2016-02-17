import mockNamespaces from 'mocks/namespaces';
import namespaceActions from 'blocks/stores/namespaces/constants';

class InstancesAPIService {

    constructor(apiCommunication, namespacesActionCreator, elasticKubeDispatcher) {
        'ngInject';

        this._elasticKubeDispatcher = elasticKubeDispatcher;
        this._namespacesActionCreator = namespacesActionCreator;

        this.dispatchToken = elasticKubeDispatcher.register((action) => apiDispatcher(this._namespacesActionCreator, action));
    }
}

function apiDispatcher(namespacesActionCreator, action) {
    switch (action.type) {
        case namespaceActions.PRELOAD_NAMESPACES:

            /* FIXME SIMULATED CALLBACK */
            setTimeout(() => {
                namespacesActionCreator.namespacesPreloaded(mockNamespaces);
            }, 0);
            break;
        default:
    }
}

export default InstancesAPIService;
