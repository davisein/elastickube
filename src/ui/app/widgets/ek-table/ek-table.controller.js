function EKTableController() {
    const self = this;

    self.clickHeader = clickHeader;

    function clickHeader(header) {
        if (self.currentSelection === header) {
            self.sortOrder = self.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            self.currentSelection = header;
            self.sortOrder = 'asc';
        }

        self.headerClickListener(header, self.sortOrder);
    }
}

export default EKTableController;
