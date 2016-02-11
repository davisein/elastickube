import mockWorkspaces from 'mocks/workspaces';

function EKInstanceModifiedController() {
    const self = this;

    self.owner = _.find(mockWorkspaces, { id: self.instance.owner });
}

export default EKInstanceModifiedController;
