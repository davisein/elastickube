import mockWorkspaces from 'mocks/workspaces';

EKHeaderController.$inject = ['$rootScope', 'auth', 'routerHelper'];

function EKHeaderController($rootScope, auth, routerHelper) {
    const self = this;

    self.namespace = 'engineering';
    self.sections = getSections(auth, routerHelper);
    self.workspace = _.find(mockWorkspaces, { id: 'alberto' });
    self.goToSection = goToSection;
    self.isLoggedIn = auth.isLoggedIn;
    self.logout = auth.logout;

    $rootScope.$on('$stateChangeSuccess', (event, toState) => self.selectedState = toState.name);

    function goToSection(section) {
        routerHelper.changeToState(section.name);
    }
}

function getSections(auth, routerHelper) {
    return _.chain(routerHelper.getStates())
        .filter(x => x.data && x.data.header && auth.authorize(x.data.access))
        .sort((x, y) => x.data.header.position - y.data.header.position)
        .value();
}

export default EKHeaderController;
