import routerHelperName from 'blocks/router/router-helper';

EKHeaderController.$inject = [ '$rootScope', routerHelperName ];

function EKHeaderController($rootScope, routerHelper) {
    const self = this;

    self.namespace = 'engineering';
    self.goToSection = goToSection;
    self.sections = getSections();

    $rootScope.$on('$stateChangeSuccess', stateChanged);

    function getSections() {
        return routerHelper.getStates()
            .filter(x => x.data && x.data.header)
            .sort((x, y) => x.data.header - y.data.header);
    }

    function goToSection(section) {
        routerHelper.go(section.name);
    }

    function stateChanged(event, toState) {
        self.selectedState = toState.name;
    }
}

export default EKHeaderController;
