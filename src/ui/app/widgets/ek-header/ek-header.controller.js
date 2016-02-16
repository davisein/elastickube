import mockWorkspaces from 'mocks/workspaces';

import constants from 'constants';

class HeaderController {
    constructor($rootScope, $scope, auth, routerHelper, session) {
        'ngInject';
        const watches = [];

        this._auth = auth;
        this._routerHelper = routerHelper;
        this._session = session;

        this.sections = getSections(auth, routerHelper);
        this.workspace = _.find(mockWorkspaces, { id: 'alberto' });

        watches.concat([
            $rootScope.$on('$stateChangeSuccess', (event, toState) => this.selectedState = toState.name)
        ]);

        $scope.$on('$destroy', () => watches.forEach((x) => x()));
    }

    goToSection(section) {
        const namespace = this._session.getItem(constants.ACTIVE_NAMESPACE);

        this._routerHelper.changeToState(section.name, { namespace });
    }

    isLoggedIn() {
        return this._auth.isLoggedIn();
    }

    logout() {
        return this._auth.logout();
    }
}

function getSections(auth, routerHelper) {
    return _.chain(routerHelper.getStates())
        .filter(x => x.data && x.data.header && auth.authorize(x.data.access))
        .sort((x, y) => x.data.header.position - y.data.header.position)
        .value();
}

export default HeaderController;
