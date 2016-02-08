import logo from 'images/kubernetes-logo.svg';
import routerHelperName from 'blocks/router/router-helper';
import { Icons as IconsName } from 'widgets/widgets.constants';

EKHeaderController.$inject = [ '$rootScope', IconsName, routerHelperName ];

function EKHeaderController($rootScope, Icons, routerHelper) {
    const self = this;

    self.logo = logo;
    self.helpIcon = Icons.HELP;
    self.moreIcon = Icons.MORE;
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
