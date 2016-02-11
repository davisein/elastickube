import routerHelperName from 'blocks/router/router-helper';

EKHeaderController.$inject = ['$rootScope', routerHelperName];

function EKHeaderController($rootScope, routerHelper) {
    const self = this;

    self.namespace = 'engineering';
    self.sections = getSections(routerHelper);
    self.goToSection = goToSection;

    $rootScope.$on('$stateChangeSuccess', (event, toState) => self.selectedState = toState.name);

    function goToSection(section) {
        routerHelper.go(section.name);
    }
}

function getSections(routerHelper) {
    return _.chain(routerHelper.getStates())
        .filter(x => x.data && x.data.header)
        .sort((x, y) => x.data.header - y.data.header)
        .value();
}

export default EKHeaderController;
