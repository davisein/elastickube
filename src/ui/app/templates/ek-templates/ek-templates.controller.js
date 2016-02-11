import mockTemplates from 'mocks/templates';

function EKTemplatesController() {
    const self = this;

    self.templates = mockTemplates;
    self.filteredTemplates = [];
    self.finalTemplates = [];
    self.sortedTemplates = [];
    self.selectedView = 'list';
    self.selectView = selectView;

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKTemplatesController;
