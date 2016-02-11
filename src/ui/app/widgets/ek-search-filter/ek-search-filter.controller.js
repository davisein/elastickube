EKSearchFilterController.$inject = ['$scope'];

function EKSearchFilterController($scope) {
    const self = this;

    self.text = '';
    self.search = search;

    $scope.$watchCollection('ctrl.collectionToBeFiltered', search);

    function search() {
        self.filteredCollection = _.size(self.text.trim()) > 0
            ? filter(self.collectionToBeFiltered, self.text)
            : self.collectionToBeFiltered;
    }
}

function filter(collectionToBeFiltered, text) {
    return _.filter(collectionToBeFiltered, (x) => x.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
}

export default EKSearchFilterController;
