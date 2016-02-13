import instanceActions from 'blocks/stores/instances/constants';

class InstancesActionCreatorService {
    constructor($q, elasticKubeDispatcher) {
        'ngInject';

        this._$q = $q;
        this._elasticKubeDispatcher = elasticKubeDispatcher;
    }

    preload(namespace) {
        this._elasticKubeDispatcher.dispatch({
            type: instanceActions.PRELOAD_INSTANCES,
            namespace
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
