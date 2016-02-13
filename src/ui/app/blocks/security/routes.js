import profiles from './profiles';

angular
    .module('blocks.security')
    .config(authRoutes);

const states = [{
    state: 'anon',
    config: {
        abstract: true,
        template: '<ui-view></ui-view>',
        data: {
            access: profiles.ANONYMOUS
        }
    }
}, {
    state: 'anon.login',
    config: {
        template: '<ek-login></ek-login>',
        url: '/login'
    }
}, {
    state: 'private',
    config: {
        abstract: true,
        template: '<ui-view></ui-view>',
        data: {
            access: profiles.PRIVATE
        }
    }
}];

authRoutes.$inject = ['routerHelperProvider'];

function authRoutes(routerHelper) {
    routerHelper.configureStates(states);
}
