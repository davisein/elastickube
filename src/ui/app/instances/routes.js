angular
    .module('app.instances')
    .config(instancesRoutes);

const states = [{
    state: 'private.instances',
    config: {
        template: '<ek-instances></ek-instances>',
        url: '/instances',
        data: {
            header: {
                name: 'instances',
                position: 1
            }
        }
    }
}];

instancesRoutes.$inject = ['routerHelperProvider'];

function instancesRoutes(routerHelper) {
    routerHelper.configureStates(states, '/instances');
}
