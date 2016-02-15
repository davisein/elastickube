import mockInstances from 'mocks/instances';

class InstancesController {
    constructor($scope) {
        'ngInject';

        this.instances = mockInstances;
        this.selectedView = 'list';
        this.showEmpty = true;
        this.instancesFilteredByOwnerAndStatus = [];
        this.instancesFilteredBySearch = [];

        $scope.$watchCollection('ctrl.instancesFilteredBySearch', (x) => this.showEmpty = _.isEmpty(x));
    }

    selectView(name) {
        this.selectedView = name;
    }
}

export default InstancesController;
