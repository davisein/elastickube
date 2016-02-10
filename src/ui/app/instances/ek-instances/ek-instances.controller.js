function EKInstancesController() {
    const self = this;

    self.selectedView = 'list';
    self.instances = [];
    self.filteredInstances = [];
    self.selectView = selectView;

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKInstancesController;
