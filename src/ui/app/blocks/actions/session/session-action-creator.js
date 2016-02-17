import sessionActions from 'blocks/stores/session/constants';

class SessionActionCreatorService {
    constructor(elasticKubeDispatcher) {
        'ngInject';

        this._elasticKubeDispatcher = elasticKubeDispatcher;
    }

    updateNamespace(namespace) {
        this._elasticKubeDispatcher.dispatch({
            type: sessionActions.UPDATE_NAMESPACE,
            namespace
        });
    }
}
export default SessionActionCreatorService;
