/* eslint max-params: 0 */
class NamespacesSelectorController {

    // FIXME Remove injected services when responsibilites are separated
    constructor($scope, sessionStore, sessionActionCreator, namespacesStore, instancesActionCreator) {
        'ngInject';

        const onChange = () => {
            this._loadState();
        };

        const onNamepaceChange = () => {
            this.namespace = this._sessionStoreService.getActiveNamespace();
        };

        this._namespacesStoreService = namespacesStore;
        this._instancesActionCreator = instancesActionCreator;
        this._sessionStoreService = sessionStore;
        this._sessionActionCreator = sessionActionCreator;
        this._sessionStoreService.addNamespaceChangeListener(onNamepaceChange);
        this._namespacesStoreService.addChangeListener(onChange);

        this._loadState();

        $scope.$on('$destroy', () => {
            this._namespacesStoreService.removeChangeListener(onChange);
            this._sessionStoreService.removeNamespaceChangeListener(onNamepaceChange);
        });
    }

    _loadState() {
        this.namespaces = this._namespacesStoreService.getAll();
        this.namespace = this._sessionStoreService.getActiveNamespace();
    }

    namespaceSelected() {
        this._sessionActionCreator.updateNamespace(this.namespace);
        this._instancesActionCreator.loadInstancesForNamespace(this.namespace);
    }
}

export default NamespacesSelectorController;
