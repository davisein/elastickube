EKInstanceFiltersController.$inject = ['$scope'];

function EKInstanceFiltersController($scope) {
    const self = this;

    self.instancesFilteredByState = [];
    self.selectedState = 'all';
    self.selectedOwners = [];
    self.filteredInstances = [];

    $scope.$watch('ctrl.selectedState', (x) => self.instancesFilteredByState = filterByState(self.instancesToFilter, x));
    $scope.$watchCollection('ctrl.instancesToFilter', (x) => self.instancesFilteredByState = filterByState(x, self.selectedState));
    $scope.$watchCollection('ctrl.instancesFilteredByState', (x) => self.filteredInstances = filterByOwner(x, self.selectedOwners));
    $scope.$watchCollection('ctrl.selectedOwners', (x) => self.filteredInstances = filterByOwner(self.instancesFilteredByState, x));
}

function filterByState(instances, state) {
    return _.filter(instances, (x) => state === 'all' || state === x.state);
}

function filterByOwner(instances, selectedOwners) {
    return _.isEmpty(selectedOwners) ? instances : _.filter(instances, (x) => _.includes(selectedOwners, x.owner));
}

export default EKInstanceFiltersController;
