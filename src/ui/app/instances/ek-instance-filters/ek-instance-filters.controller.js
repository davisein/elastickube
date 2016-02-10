EKInstanceFiltersController.$inject = ['$scope'];

function EKInstanceFiltersController($scope) {
    const self = this;

    self.instancesFilteredByState = [];
    self.selectedState = 'all';
    self.owners = [];
    self.output = [];

    $scope.$watchCollection('ctrl.input', (x) => self.instancesFilteredByState = filterByState(x, self.selectedState));
    $scope.$watchCollection('ctrl.instancesFilteredByState', (x) => self.output = filterByOwner(x, self.owners));
    $scope.$watchCollection('ctrl.owners', (x) => self.output = filterByOwner(self.instancesFilteredByState, x));
}

function filterByState(instances, state) {
    return _.filter(instances, (x) => state === getInstanceState(x));
}

// just to mock
function getInstanceState(instance) {
    return instance.state || 'online';
}

function filterByOwner(instances, owners) {
    return _.isEmpty(owners) ? instances : _.filter(instances, (x) => _.includes(owners, x.owner));
}

export default EKInstanceFiltersController;
