EKInstanceFiltersController.$inject = ['$scope'];

function EKInstanceFiltersController($scope) {
    const self = this;

    self.instancesFilteredByState = [];
    self.selectedState = 'all';
    self.owners = [];
    self.output = [];

    $scope.$watch('ctrl.selectedState', (x) => self.instancesFilteredByState = filterByState(self.input, x));
    $scope.$watchCollection('ctrl.input', (x) => self.instancesFilteredByState = filterByState(x, self.selectedState));
    $scope.$watchCollection('ctrl.instancesFilteredByState', (x) => self.output = filterByOwner(x, self.owners));
    $scope.$watchCollection('ctrl.owners', (x) => self.output = filterByOwner(self.instancesFilteredByState, x));
}

function filterByState(instances, state) {
    return _.filter(instances, (x) => state === 'all' || state === x.state);
}

function filterByOwner(instances, owners) {
    return _.isEmpty(owners) ? instances : _.filter(instances, (x) => _.includes(owners, x.owner));
}

export default EKInstanceFiltersController;
