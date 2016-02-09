EKSearchFilterController.$inject = ['$scope'];

function EKSearchFilterController($scope) {
    const self = this;

    self.text = '';
    self.search = search;

    $scope.$watch('input', search);

    function search() {
        self.output = _.size(self.text.trim()) > 0 ? filter(self.input, self.text) : self.input;
    }

    function filter(input, text) {
        return _.filter(input, (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > 0);
    }
}

export default EKSearchFilterController;
