import headers from './ek-instance-list.headers';

EKInstanceListController.$inject = ['$scope'];

function EKInstanceListController($scope) {
    const self = this;

    self.headers = headers;
    self.sortBy = self.headers[0];
    self.sortByCallback = sortByCallback;

    $scope.$watchCollection('ctrl.instances', (x) => self.sortedInstances = sortInstances(x, self.sortBy));

    function sortByCallback(column) {
        if (self.sortBy === column && angular.isDefined(self.sortBy.sortableField)) {
            self.sortBy.reverse = !self.sortBy.reverse;
        } else {
            self.sortBy = column;
            self.sortBy.reverse = false;
        }

        self.sortedInstances = sortInstances(self.sortedInstances, self.sortBy);
    }
}

function sortInstances(instances, criteria) {
    if (angular.isDefined(criteria.sortableField)) {
        return _.orderBy(instances, (x) => x[criteria.sortableField], criteria.reverse ? 'desc' : 'asc');
    }

    return instances;
}

export default EKInstanceListController;
