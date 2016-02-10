function EKInstancesController() {
    this.selectedView = 'list';
    this.owners = [];
}

EKInstancesController.prototype.selectView = selectView;

function selectView(name) {
    this.selectedView = name;
}

export default EKInstancesController;
