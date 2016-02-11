import mockInstances from 'mocks/instances';

EKInstancesController.$inject = ['$scope'];

function EKInstancesController($scope) {
    const self = this;

    self.instances = mockInstances;
    self.selectedView = 'list';
    self.showEmpty = true;
    self.instancesFilteredByOwnerAndStatus = [];
    self.instancesFilteredBySearch = [];
    self.selectView = selectView;

    $scope.$watchCollection('ctrl.instancesFilteredBySearch', (x) => self.showEmpty = _.isEmpty(x));

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKInstancesController;
