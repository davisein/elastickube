/* eslint max-params: 0 */
import constants from 'constants';

class NamespacesSelectorController {

    // FIXME Remove injected services when responsibilites are separated
    constructor($scope, $state, routerHelper, session, namespacesStore, instancesActionCreator) {
        'ngInject';

        const onChange = () => {
            this._loadState();
        };

        this._$state = $state;
        this._routerHelper = routerHelper;
        this._namespacesStoreService = namespacesStore;
        this._instancesActionCreator = instancesActionCreator;
        this._session = session;
        this._namespacesStoreService.addChangeListener(onChange);

        this._loadState();

        $scope.$on('$destroy', () => this._namespacesStoreService.removeChangeListener(onChange));
    }

    _loadState() {
        this.namespaces = this._namespacesStoreService.getAll();
        this.namespace = this._namespacesStoreService.getActiveNamespace();
        this._session.setItem(constants.ACTIVE_NAMESPACE, this.namespace);
    }

    namespaceSelected() {
        this._instancesActionCreator.loadInstancesForNamespace(this.namespace);
        this._session.setItem(constants.ACTIVE_NAMESPACE, this.namespace);

        this._routerHelper.changeToState(this._$state.current.name, { namespace: this.namespace });
    }
}

export default NamespacesSelectorController;
