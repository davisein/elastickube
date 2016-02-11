import mockWorkspaces from 'mocks/workspaces';

EKOwnersSelectorController.$inject = ['$scope'];

function EKOwnersSelectorController($scope) {
    const self = this;

    self.selectedOwners = self.selectedOwners || [];
    self.open = true;
    self.toggleOpen = toggleOpen;
    self.isOwnerSelected = isOwnerSelected;
    self.toggleSelectedOwner = toggleSelectedOwner;

    $scope.$watchCollection('ctrl.shareables', (x) => {
        self.owners = getOwners(x);
        self.selectedOwners = _.filter(self.selectedOwners, (y) => !!_.find(self.owners, { id: y }));
    });

    function toggleOpen() {
        self.open = !self.open;
    }

    function isOwnerSelected(owner) {
        return _.includes(self.selectedOwners, owner.id);
    }

    function toggleSelectedOwner(owner) {
        if (self.isOwnerSelected(owner)) {
            self.selectedOwners = _.without(self.selectedOwners, owner.id);
        } else {
            self.selectedOwners = self.selectedOwners.concat(owner.id);
        }
    }
}

function getOwners(shareables) {
    return _.chain(shareables)
        .map((x) => _.find(mockWorkspaces, { id: x.owner }))
        .uniq()
        .sortBy('id')
        .value();
}

export default EKOwnersSelectorController;
