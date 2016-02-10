function EKInstancesController() {
    this.selectedView = 'list';
}

EKInstancesController.prototype.selectView = selectView;

function selectView(name) {
    this.selectedView = name;
}

export default EKInstancesController;
