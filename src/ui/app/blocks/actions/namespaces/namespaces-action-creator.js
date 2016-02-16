import namespaceActions from 'blocks/stores/namespaces/constants';

class NamespacesActionCreatorService {
    constructor($q, elasticKubeDispatcher) {
        'ngInject';

        this._$q = $q;
        this._elasticKubeDispatcher = elasticKubeDispatcher;
    }

    preload() {
        this._elasticKubeDispatcher.dispatch({
            type: namespaceActions.PRELOAD_NAMESPACES
        });
    }

    namespacesPreloaded(namespaces) {
        this._elasticKubeDispatcher.dispatch({
            type: namespaceActions.NAMESPACES_PRELOADED,
            namespaces
        });
    }
}
export default NamespacesActionCreatorService;
