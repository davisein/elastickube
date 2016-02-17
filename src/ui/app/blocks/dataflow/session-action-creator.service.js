class SessionActionCreatorService {
    constructor(actions, dispatcher) {
        'ngInject';

        this._actions = actions.session;
        this._dispatcher = dispatcher;
    }

    updateNamespace(namespace) {
        this._dispatcher.dispatch({
            type: this._actions.UPDATE_NAMESPACE,
            namespace
        });
    }
}

export default SessionActionCreatorService;
