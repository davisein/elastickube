import headers from './ek-instance-list.headers';

EKInstanceListController.$inject = ['$scope'];

function EKInstanceListController($scope) {
    const self = this;

    self.headers = headers;
    self.sortBy = self.headers[0];
    self.sortByCallback = sortByCallback;

    $scope.$watchCollection('ctrl.instances', (x) => self.sortedInstances = sortInstances(x, self.sortBy));

    function sortByCallback(column, sortOrder) {
        self.sortedInstances = sortInstances(self.sortedInstances, column, sortOrder);
    }
}

function sortInstances(instances, column, sortOrder) {
    if (angular.isDefined(column.sortableField)) {
        return _.orderBy(instances, (x) => _.get(x, column.sortableField), sortOrder);
    }

    return instances;
}

export default EKInstanceListController;
