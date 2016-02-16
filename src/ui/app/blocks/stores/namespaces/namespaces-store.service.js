import namespaceActions from './constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class NamespacesStoreService extends EventEmitter {
    constructor($q, elasticKubeDispatcher) {
        'ngInject';

        super();
        this._$q = $q;
        this._loading = this._$q.defer();

        this.elasticKubeDispatcher = elasticKubeDispatcher;
        this.dispatchToken = elasticKubeDispatcher.register((action) => {
            switch (action.type) {
                case namespaceActions.NAMESPACES_PRELOADED:
                    this._loading.resolve();
                    this._setNamespaces(action.namespaces);
                    this._activeNamespace = action.namespaces[0];
                    this._emitChange();
                    break;
                default:
            }
        });
    }

    _setNamespaces(namespaces) {
        this._namespaces = namespaces;
    }

    _emitChange() {
        this.emit(CHANGE_EVENT);
    }

    loading() {
        return this._loading.promise;
    }

    getAll() {
        return this._namespaces;
    }

    getActiveNamespace() {
        return this._activeNamespace;
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default NamespacesStoreService;
