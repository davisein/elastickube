EKInstanceListController.$inject = ['$scope'];

const sortInstances = function(instances, criteria) {
    return angular.isDefined(criteria.sortableField)
        ? _.orderBy(instances, (instance) => instance[criteria.sortableField], criteria.reverse ? 'desc' : 'asc') : instances;
};

function EKInstanceListController($scope) {
    const self = this;

    self.sortyByCallback = function(column) {
        if (self.sortBy === column && angular.isDefined(self.sortBy.sortableField)) {
            self.sortBy.reverse = !self.sortBy.reverse;
        } else {
            self.sortBy = column;
            self.sortBy.reverse = false;
        }
        self.sortedInstances = sortInstances(self.sortedInstances, self.sortBy);
    };

    $scope.$watchCollection('ctrl.instances', (instances) => {
        self.sortedInstances = sortInstances(instances, self.sortBy);
    });

    self.headers = [{
        title: 'Name',
        sortableField: 'name'
    }, {
        title: 'State',
        sortableField: 'state',
        order: 'asc'
    }, {
        title: 'Service ID',
        sortableField: 'serviceId'
    }, {
        title: 'Labels'
    }, {
        title: 'Modified',
        sortableField: 'updated'
    }];

    self.instances = [{
        name: 'blog-prod-us-a',
        state: 'online',
        serviceId: 'ek-106hk',
        labels: [],
        updated: new Date()
    }, {
        name: 'kibana-prod',
        state: 'online',
        serviceId: 'ek-dv66d',
        labels: [],
        updated: new Date()
    }, {
        name: 'mysql-prod-us-a',
        state: 'online',
        serviceId: 'ek-a323f',
        labels: [],
        updated: new Date()
    }, {
        name: 'multi-bastion-prod-us-a',
        state: 'online',
        serviceId: 'ek-li2a9',
        labels: [],
        updated: new Date()
    }, {
        name: 'services-prod-us-a',
        state: 'online',
        serviceId: 'ek-gr43d',
        labels: [],
        updated: new Date()
    }, {
        name: 'website-prod-us-a',
        state: 'online',
        serviceId: 'ek-ot32e',
        labels: [],
        updated: new Date()
    }];

    self.sortBy = self.headers[0];
}

export default EKInstanceListController;
