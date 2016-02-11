function EKTableController() {
}

EKTableController.prototype.clickHeader = function(header) {
    const self = this;

    if (self.currentSelection === header) {
        self.sortOrder = self.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        self.currentSelection = header;
        self.sortOrder = 'asc';
    }
    self.headerClickListener(header, self.sortOrder);
};

export default EKTableController;
