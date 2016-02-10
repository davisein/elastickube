function EKInstancesController() {
    this.selectedView = 'list';
    this.instances = [];
    this.filteredInstances = [];
}

EKInstancesController.prototype.selectView = selectView;

function selectView(name) {
    this.selectedView = name;
}

export default EKInstancesController;
