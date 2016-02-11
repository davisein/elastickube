EKTemplateFiltersController.$inject = ['$scope'];

function EKTemplateFiltersController($scope) {
    const self = this;

    self.templatesFilteredByType = [];
    self.selectedType = 'all';
    self.selectedOwners = [];
    self.filteredTemplates = [];

    $scope.$watch('ctrl.selectedType', (x) => self.templatesFilteredByType = filterByType(self.templatesToFilter, x));
    $scope.$watchCollection('ctrl.templatesToFilter', (x) => self.templatesFilteredByType = filterByType(x, self.selectedType));
    $scope.$watchCollection('ctrl.templatesFilteredByType', (x) => self.filteredTemplates = filterByOwner(x, self.selectedOwners));
    $scope.$watchCollection('ctrl.selectedOwners', (x) => self.filteredTemplates = filterByOwner(self.templatesFilteredByType, x));
}

function filterByType(templates, type) {
    return _.filter(templates, (x) => type === 'all' || type === x.type);
}

function filterByOwner(templates, selectedOwners) {
    return _.isEmpty(selectedOwners) ? templates : _.filter(templates, (x) => _.includes(selectedOwners, x.owner));
}

export default EKTemplateFiltersController;
