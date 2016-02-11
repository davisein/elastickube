EKSearchFilterController.$inject = ['$scope'];

function EKSearchFilterController($scope) {
    const self = this;

    self.text = '';
    self.search = search;

    $scope.$watchCollection('ctrl.input', search);

    function search() {
        self.output = _.size(self.text.trim()) > 0 ? filter(self.input, self.text) : self.input;
    }
}

function filter(input, text) {
    return _.filter(input, (x) => x.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
}

export default EKSearchFilterController;
