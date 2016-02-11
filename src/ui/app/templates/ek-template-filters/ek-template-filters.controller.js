EKTemplateFiltersController.$inject = ['$scope'];

function EKTemplateFiltersController($scope) {
    const self = this;

    self.templatesFilteredByType = [];
    self.selectedType = 'all';
    self.owners = [];
    self.output = [];

    $scope.$watch('ctrl.selectedType', (x) => self.templatesFilteredByType = filterByType(self.input, x));
    $scope.$watchCollection('ctrl.input', (x) => self.templatesFilteredByType = filterByType(x, self.selectedType));
    $scope.$watchCollection('ctrl.templatesFilteredByType', (x) => self.output = filterByOwner(x, self.owners));
    $scope.$watchCollection('ctrl.owners', (x) => self.output = filterByOwner(self.templatesFilteredByType, x));
}

function filterByType(templates, type) {
    return _.filter(templates, (x) => type === 'all' || type === x.type);
}

function filterByOwner(templates, owners) {
    return _.isEmpty(owners) ? templates : _.filter(templates, (x) => _.includes(owners, x.owner));
}

export default EKTemplateFiltersController;
