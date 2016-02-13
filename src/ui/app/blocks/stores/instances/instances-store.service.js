import instanceActions from './constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class InstancesStore extends EventEmitter {
    constructor($q, elasticKubeDispatcher) {
        'ngInject';

        super();
        this._$q = $q;
        this._loading = this._$q.defer();

        this.elasticKubeDispatcher = elasticKubeDispatcher;
        this.dispatchToken = elasticKubeDispatcher.register((action) => {
            switch (action.type) {
                case instanceActions.INSTANCES_PRELOADED:
                    this._loading = this._loading.resolve();
                    this._setInstances(action.instances);
                    this._emitChange();
                    break;
                default:
            }
        });
    }

    _setInstances(instances) {
        this._instances = instances;
    }

    _emitChange() {
        this.emit(CHANGE_EVENT);
    }

    loading() {
        return this._loading.promise;
    }
    get(id) {
        return _.find(this._instances, { id });
    }

    getAll() {
        return this._instances;
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default InstancesStore;
