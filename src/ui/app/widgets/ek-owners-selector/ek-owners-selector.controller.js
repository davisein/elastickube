import { instances as mockInstances, workspaces as mockWorkspaces } from './ek-owners-selector.mock';

EKOwnersSelectorController.$inject = ['$scope'];

function EKOwnersSelectorController($scope) {
    const self = this;

    self.model = self.model || [];
    self.open = true;
    self.toggleOpen = toggleOpen;
    self.isOwnerSelected = isOwnerSelected;
    self.toggleSelectedOwner = toggleSelectedOwner;

    // just for mock
    self.instances = mockInstances;

    $scope.$watchCollection('ctrl.instances', (x) => self.owners = getOwners(x));

    function toggleOpen() {
        self.open = !self.open;
    }

    function isOwnerSelected(owner) {
        return _.includes(self.model, owner.id);
    }

    function toggleSelectedOwner(owner) {
        if (self.isOwnerSelected(owner)) {
            self.model = _.without(self.model, owner.id);
        } else {
            self.model = self.model.concat(owner.id);
        }
    }
}

function getOwners(instances) {
    return _.chain(instances)
        .map((x) => _.find(mockWorkspaces, { id: x.owner }))
        .uniq()
        .value();
}

export default EKOwnersSelectorController;
