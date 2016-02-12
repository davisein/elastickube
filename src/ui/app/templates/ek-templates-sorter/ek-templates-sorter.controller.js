import mockWorkspaces from 'mocks/workspaces';

EKTemplatesSorterController.$inject = ['$scope'];

function EKTemplatesSorterController($scope) {
    const self = this;

    self.sortTypes = ['name', 'most recent', 'owner'];
    self.sortType = _.first(self.sortTypes);

    $scope.$watch('ctrl.sortType', (x) => self.sortedCollection = sortByType(self.collectionToSort, x));
    $scope.$watchCollection('ctrl.collectionToSort', (x) => self.sortedCollection = sortByType(x, self.sortType));
}

function sortByType(collectionToSort, sortType) {
    switch (sortType) {
        case 'name':
            return sortByName(collectionToSort);
        case 'owner':
            return sortByOwner(collectionToSort);
        default:
            return sortByMostRecent(collectionToSort);
    }
}

function sortByName(collectionToSort) {
    return _.orderBy(collectionToSort, 'name');
}

function sortByMostRecent(collectionToSort) {
    return _.orderBy(collectionToSort, 'created');
}

function sortByOwner(collectionToSort) {
    return _.sortBy(collectionToSort, (x) => _.find(mockWorkspaces, { id: x.owner }).name);
}

export default EKTemplatesSorterController;
