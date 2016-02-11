import mockTemplates from 'mocks/templates';

EKTemplatesController.$inject = ['$scope'];

function EKTemplatesController($scope) {
    const self = this;

    self.templates = mockTemplates;
    self.templatesFilteredByOwnerAndType = [];
    self.templatesFilteredBySearch = [];
    self.templatesSortedByType = [];
    self.selectedView = 'list';
    self.showEmpty = true;
    self.selectView = selectView;

    $scope.$watch('ctrl.templatesFilteredBySearch', checkIsEmpty);
    $scope.$watch('ctrl.templatesSortedByType', checkIsEmpty);

    function checkIsEmpty() {
        self.showEmpty = self.selectedView === 'list'
            ? _.isEmpty(self.templatesFilteredBySearch)
            : _.isEmpty(self.templatesSortedByType);
    }

    function selectView(name) {
        self.selectedView = name;
        checkIsEmpty();
    }
}

export default EKTemplatesController;
