import mockInstances from 'mocks/instances';
import instanceActions from 'blocks/stores/instances/constants';

class InstancesAPIService {

    constructor(apiCommunication, instancesActionCreator, elasticKubeDispatcher) {
        'ngInject';

        this._elasticKubeDispatcher = elasticKubeDispatcher;
        this._instancesActionCreator = instancesActionCreator;

        this.dispatchToken = elasticKubeDispatcher.register((action) => apiDispatcher(instancesActionCreator, action));
    }
}

function apiDispatcher(instancesActionCreator, action) {
    switch (action.type) {
        case instanceActions.PRELOAD_INSTANCES:

            /* SIMULATED CALLBACK */
            setTimeout(() => {
                instancesActionCreator.instancesPreloaded(mockInstances);
            }, 0);
            break;
        default:
    }
}

export default InstancesAPIService;
