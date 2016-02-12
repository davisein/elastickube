EKInstanceStateSelectorController.$inject = ['$scope'];

function EKInstanceStateSelectorController($scope) {
    const self = this;

    self.states = ['all', 'online', 'unavailable', 'processing', 'terminated'];
    self.selectedState = _.first(self.states);
    self.selectState = selectState;

    $scope.$watchCollection('ctrl.instances', (x) => self.stateValues = countStates(x));

    function selectState(state) {
        self.selectedState = state;
    }
}

function countStates(instances) {
    return _.chain(instances)
        .groupBy('state')
        .mapValues((x) => x.length)
        .value();
}

export default EKInstanceStateSelectorController;
