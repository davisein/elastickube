import mockInstances from 'mocks/instances';

function EKInstancesController() {
    const self = this;

    self.instances = mockInstances;
    self.selectedView = 'list';
    self.filteredInstances = [];
    self.finalInstances = [];
    self.selectView = selectView;

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKInstancesController;
