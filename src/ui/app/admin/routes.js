import profiles from 'blocks/security/profiles';

angular
    .module('app.admin')
    .config(adminRoutes);

const states = [{
    state: 'admin',
    config: {
        template: '<ek-admin></ek-admin>',
        url: '/admin',
        data: {
            header: {
                name: 'admin',
                position: 3
            },
            access: profiles.ADMIN
        }
    }
}];

adminRoutes.$inject = ['routerHelperProvider'];

function adminRoutes(routerHelper) {
    routerHelper.configureStates(states);
}
