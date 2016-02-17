import instanceActions from 'blocks/stores/instances/constants';

class InstancesActionCreatorService {
    constructor($q, elasticKubeDispatcher) {
        'ngInject';

        this._$q = $q;
        this._elasticKubeDispatcher = elasticKubeDispatcher;
    }

    preload() {
        this._elasticKubeDispatcher.dispatch({
            type: instanceActions.PRELOAD_INSTANCES
        });
    }

    loadInstancesForNamespace(namespace) {
        this._elasticKubeDispatcher.dispatch({
            type: instanceActions.LOAD_INSTANCES_FOR_NAMESPACE,
            namespace
        });
    }

    instancesLoaded(instances) {
        this._elasticKubeDispatcher.dispatch({
            type: instanceActions.INSTANCES_LOADED,
            instances
        });
    }

    instancesPreloaded(instances) {
        this._elasticKubeDispatcher.dispatch({
            type: instanceActions.INSTANCES_PRELOADED,
            instances
        });
    }
}
export default InstancesActionCreatorService;
