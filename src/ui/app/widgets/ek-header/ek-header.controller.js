import mockWorkspaces from 'mocks/workspaces';

EKHeaderController.$inject = ['$rootScope', 'routerHelper'];

function EKHeaderController($rootScope, routerHelper) {
    const self = this;

    self.namespace = 'engineering';
    self.sections = getSections(routerHelper);
    self.workspace = _.find(mockWorkspaces, { id: 'alberto' });
    self.goToSection = goToSection;

    $rootScope.$on('$stateChangeSuccess', (event, toState) => self.selectedState = toState.name);

    function goToSection(section) {
        routerHelper.changeToState(section.name);
    }
}

function getSections(routerHelper) {
    return _.chain(routerHelper.getStates())
        .filter(x => x.data && x.data.header)
        .sort((x, y) => x.data.header - y.data.header)
        .value();
}

export default EKHeaderController;
