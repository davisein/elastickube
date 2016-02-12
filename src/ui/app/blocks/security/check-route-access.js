angular
    .module('blocks.security')
    .run(checkRouteAccess);

checkRouteAccess.$inject = ['$rootScope', 'routerHelper', 'auth'];

function checkRouteAccess($rootScope, routerHelper, auth) {
    $rootScope.$on('$stateChangeStart', checkAccess);

    function checkAccess(event, toState, toParams, fromState) {
        if (!auth.authorize(toState.data.access)) {
            event.preventDefault();

            if (fromState.url === '^') {
                if (auth.isLoggedIn()) {
                    routerHelper.changeToState('private.instances');
                } else {
                    routerHelper.changeToState('public.login');
                }
            }
        }
    }
}
