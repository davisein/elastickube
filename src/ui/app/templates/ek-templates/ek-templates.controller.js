import mockTemplates from 'mocks/templates';

EKTemplatesController.$inject = ['$scope'];

function EKTemplatesController($scope) {
    const self = this;

    self.templates = mockTemplates;
    self.filteredTemplates = [];
    self.finalTemplates = [];
    self.sortedTemplates = [];
    self.selectedView = 'list';
    self.showEmpty = true;
    self.selectView = selectView;

    $scope.$watch('ctrl.finalTemplates', checkIsEmpty);
    $scope.$watch('ctrl.sortedTemplates', checkIsEmpty);

    function checkIsEmpty() {
        self.showEmpty = self.selectedView === 'list'
            ? _.isEmpty(self.finalTemplates)
            : _.isEmpty(self.sortedTemplates);
    }

    function selectView(name) {
        self.selectedView = name;
        checkIsEmpty();
    }
}

export default EKTemplatesController;
