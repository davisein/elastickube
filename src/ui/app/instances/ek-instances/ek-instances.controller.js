class InstancesController {
    constructor($scope, instancesStore) {
        'ngInject';

        const onChange = () => this.instances = this._instancesStoreService.getAll();

        this._instancesStoreService = instancesStore;
        this._instancesStoreService.addChangeListener(onChange);

        this.instances = this._instancesStoreService.getAll();
        this.selectedView = 'list';
        this.showEmpty = true;
        this.instancesFilteredByOwnerAndStatus = [];
        this.instancesFilteredBySearch = [];

        $scope.$watchCollection('ctrl.instancesFilteredBySearch', (x) => this.showEmpty = _.isEmpty(x));

        $scope.$on('$destroy', () => {
            this._instancesStoreService.removeChangeListener(onChange);
        });
    }

    selectView(name) {
        this.selectedView = name;
    }
}

export default InstancesController;
