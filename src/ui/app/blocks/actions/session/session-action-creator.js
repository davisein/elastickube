import sessionActions from 'blocks/stores/session/constants';

class SessionActionCreatorService {
    constructor(elasticKubeDispatcher) {
        'ngInject';

        this._elasticKubeDispatcher = elasticKubeDispatcher;
    }

    changeActiveNamespace(namespace) {
        this._elasticKubeDispatcher.dispatch({
            type: sessionActions.SET_ACTIVE_NAMESPACE,
            namespace
        });
    }
}
export default SessionActionCreatorService;
