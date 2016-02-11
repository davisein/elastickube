import mockTemplates from 'mocks/templates';

function EKTemplatesController() {
    const self = this;

    self.templates = mockTemplates;
    self.sortTypes = ['name', 'most recent', 'owner'];
    self.sortType = _.first(self.sortTypes);
    self.selectedView = 'list';
    self.selectView = selectView;

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKTemplatesController;
