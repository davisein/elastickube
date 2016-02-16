import { EventEmitter } from 'events';
import sessionActions from './constants';

const NAMESPACE_CHANGE_EVENT = 'namespace.change';

const sessionKeys = {
    ACTIVE_NAMESPACE: 'ACTIVE_NAMESPACE'
};

class NamespacesStoreService extends EventEmitter {
    constructor($q, session, elasticKubeDispatcher) {
        'ngInject';

        super();
        this._$q = $q;
        this._session = session;

        this.elasticKubeDispatcher = elasticKubeDispatcher;
        this.dispatchToken = elasticKubeDispatcher.register((action) => {
            switch (action.type) {
                case sessionActions.SET_ACTIVE_NAMESPACE:
                    session.setItem(sessionKeys.ACTIVE_NAMESPACE, action.namespace);
                    this._emitNamespaceChange();
                    break;
                default:
            }
        });
    }

    _emitNamespaceChange() {
        this.emit(NAMESPACE_CHANGE_EVENT);
    }

    getActiveNamespace() {
        return this._session.getItem(sessionKeys.ACTIVE_NAMESPACE);
    }

    addNamespaceChangeListener(callback) {
        this.on(NAMESPACE_CHANGE_EVENT, callback);
    }

    removeNamespaceChangeListener(callback) {
        this.removeListener(NAMESPACE_CHANGE_EVENT, callback);
    }
}

export default NamespacesStoreService;
