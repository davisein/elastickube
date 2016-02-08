import _ from 'lodash';

EKTemplatesController.$inject = [];

function EKTemplatesController() {
    const self = this;

    self.sortTypes = ['name', 'most recent', 'owner'];
    self.sortType = _.first(self.sortTypes);
    self.selectedView = 'list';
    self.selectView = selectView;

    function selectView(name) {
        self.selectedView = name;
    }
}

export default EKTemplatesController;
