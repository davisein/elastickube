import _ from 'lodash';


EKSearchFilterController.$inject = [ '$scope' ];

function EKSearchFilterController($scope) {
    const self = this;

    self.text = '';
    self.search = search;

    $scope.$watch('input', search);

    function search() {
        $scope.output = _.size(self.text.trim()) > 0 ? filter($scope.input, self.text) : $scope.input;
    }

    function filter(input, text) {
        return _.filter(input, (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > 0);
    }
}


export default EKSearchFilterController;
