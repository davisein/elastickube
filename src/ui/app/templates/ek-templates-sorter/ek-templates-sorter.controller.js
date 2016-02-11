import mockWorkspaces from 'mocks/workspaces';

EKTemplatesSorterController.$inject = ['$scope'];

function EKTemplatesSorterController($scope) {
    const self = this;

    self.sortTypes = ['name', 'most recent', 'owner'];
    self.sortType = _.first(self.sortTypes);

    $scope.$watch('ctrl.sortType', (x) => self.output = sortByType(self.input, x));
    $scope.$watchCollection('ctrl.input', (x) => self.output = sortByType(x, self.sortType));
}

function sortByType(input, type) {
    switch (type) {
        case 'name':
            return sortByName(input);
        case 'owner':
            return sortByOwner(input);
        default:
            return sortByMostRecent(input);
    }
}

function sortByName(input) {
    return _.orderBy(input, 'name');
}

function sortByMostRecent(input) {
    return _.orderBy(input, 'created');
}

function sortByOwner(input) {
    return _.sortBy(input, (x) => _.find(mockWorkspaces, { id: x.owner }).name);
}

export default EKTemplatesSorterController;
