import { instances as mockInstances, workspaces as mockWorkspaces } from './ek-owners-selector.mock';

EKOwnersSelectorController.$inject = ['$scope'];

function EKOwnersSelectorController($scope) {
    const self = this;

    self.model = self.model || [];
    self.open = true;

    // just for mock
    self.instances = mockInstances;

    $scope.$watchCollection('ctrl.instances', (x) => self.owners = getOwners(x));
}

EKOwnersSelectorController.prototype.toggleOpen = toggleOpen;
EKOwnersSelectorController.prototype.isOwnerSelected = isOwnerSelected;
EKOwnersSelectorController.prototype.toggleSelectedOwner = toggleSelectedOwner;

function toggleOpen() {
    this.open = !this.open;
}

function isOwnerSelected(owner) {
    return _.includes(this.model, owner.id);
}

function toggleSelectedOwner(owner) {
    if (this.isOwnerSelected(owner)) {
        this.model = _.without(this.model, owner.id);
    } else {
        this.model = this.model.concat(owner.id);
    }
}

function getOwners(instances) {
    return _.chain(instances)
        .map((x) => _.find(mockWorkspaces, { id: x.owner }))
        .uniq()
        .value();
}

export default EKOwnersSelectorController;
