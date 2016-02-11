import headers from './ek-template-list.headers';

EKTemplateListController.$inject = ['$scope'];

function EKTemplateListController($scope) {
    const self = this;

    self.headers = headers;
    self.sortBy = self.headers[0];
    self.sortByCallback = sortByCallback;

    $scope.$watchCollection('ctrl.templates', (x) => self.sortedTemplates = sortTemplates(x, self.sortBy));

    function sortByCallback(column, sortOrder) {
        self.sortedTemplates = sortTemplates(self.sortedTemplates, column, sortOrder);
    }
}

function sortTemplates(templates, column, sortOrder) {
    if (angular.isDefined(column.sortableField)) {
        return _.orderBy(templates, (x) => _.get(x, column.sortableField), sortOrder);
    }

    return templates;
}

export default EKTemplateListController;
