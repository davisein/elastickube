EKTemplateTypeSelectorController.$inject = ['$scope'];

const types = [
    'all',
    'resource list',
    'replication controller',
    'services',
    'volumes',
    'persistent volumes',
    'secrets',
    'ingress',
    'job',
    'pod autoscaling'
];

function EKTemplateTypeSelectorController($scope) {
    const self = this;

    self.types = types;
    self.selectedType = _.first(self.types);
    self.selectType = selectType;

    $scope.$watchCollection('ctrl.templates', (x) => self.typeValues = countTypes(x));

    function selectType(state) {
        self.selectedType = state;
    }
}

function countTypes(templates) {
    return _.chain(templates)
        .groupBy('type')
        .mapValues((x) => x.length)
        .value();
}

export default EKTemplateTypeSelectorController;
