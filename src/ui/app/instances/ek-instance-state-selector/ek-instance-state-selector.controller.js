import STATES from './ek-instance-state-selector.states';

EKInstanceStateSelectorController.$inject = ['$scope'];

function EKInstanceStateSelectorController($scope) {
    const self = this;

    self.model = _.first(_.keys(STATES));
    self.selectState = selectState;

    $scope.$watchCollection('ctrl.instances', (x) => self.states = countStates(x, angular.copy(STATES)));

    function selectState(state) {
        self.model = state;
    }
}

function countStates(instances, states) {
    return states;
}

export default EKInstanceStateSelectorController;
