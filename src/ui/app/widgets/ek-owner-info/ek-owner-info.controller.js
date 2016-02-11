import mockWorkspaces from 'mocks/workspaces';

function EKOwnerInfoController() {
    const self = this;

    self.owner = _.find(mockWorkspaces, { id: self.shareable.owner });
}

export default EKOwnerInfoController;
