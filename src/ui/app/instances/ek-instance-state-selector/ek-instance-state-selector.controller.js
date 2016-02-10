const STATES = {
    all: 0,
    online: 0,
    unavailable: 0,
    processing: 0,
    terminated: 0
};

EKInstanceStateSelectorController.$inject = ['$scope'];

function EKInstanceStateSelectorController($scope) {
    const self = this;

    self.model = _.first(_.keys(STATES));

    $scope.$watchCollection('ctrl.instances', (x) => self.states = countStates(x, angular.copy(STATES)));
}

EKInstanceStateSelectorController.prototype.selectState = selectState;

function selectState(state) {
    this.model = state;
}

function countStates(instances, states) {
    return states;
}

export default EKInstanceStateSelectorController;
