angular
    .module('blocks.security')
    .run(checkRouteAccess);

checkRouteAccess.$inject = ['$rootScope', 'auth', 'routerHelper'];

function checkRouteAccess($rootScope, auth, routerHelper) {
    $rootScope.$on('$stateChangeStart', checkAccess);

    function checkAccess(event, toState, toParams, fromState) {
        if (!auth.authorize(toState.data.access)) {
            event.preventDefault();

            if (fromState.url === '^') {
                if (auth.isLoggedIn()) {
                    const defaultNamespace = 'engineering';

                    routerHelper.changeToState('private.instances', { namespace: defaultNamespace });
                } else {
                    routerHelper.changeToState('anon.login');
                }
            }
        }
    }
}
