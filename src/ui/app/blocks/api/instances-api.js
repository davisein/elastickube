import mockInstances from 'mocks/instances';
import instanceActions from 'blocks/stores/instances/constants';

class InstancesAPIService {

    constructor(instancesStore, instancesActionCreator, elasticKubeDispatcher) {
        'ngInject';

        this._elasticKubeDispatcher = elasticKubeDispatcher;
        this._instancesActionCreator = instancesActionCreator;

        this.dispatchToken = elasticKubeDispatcher.register((action) => this._apiDispatcher(action));
    }

    _apiDispatcher(action) {
        switch (action.type) {
            case instanceActions.PRELOAD_INSTANCES:

                // FIXME SIMULATED CALLBACK
                setTimeout(() => {
                    this._instancesActionCreator.instancesPreloaded(mockInstances.default);
                }, 0);
                break;

            case instanceActions.LOAD_INSTANCES_FOR_NAMESPACE:
                setTimeout(() => {
                    this._instancesActionCreator.instancesLoaded(mockInstances[action.namespace]);
                }, 0);
                break;

            default:
        }
    }
}

export default InstancesAPIService;
