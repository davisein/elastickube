angular
    .module('app.admin')
    .run(adminRoutes);

const states = [{
    state: 'admin',
    config: {
        template: '<ek-admin></ek-admin>',
        url: '/admin',
        data: {
            roles: ['admin']
        }
    }
}];

adminRoutes.$inject = ['routerHelper'];

function adminRoutes(routerHelper) {
    routerHelper.configureStates(states);
}
