angular
    .module('app.instances')
    .run(instancesRoutes);

const states = [{
    state: 'instances',
    config: {
        template: '<ek-instances></ek-instances>',
        url: '/instances',
        data: {
            header: 1
        }
    }
}];

instancesRoutes.$inject = ['routerHelper'];

function instancesRoutes(routerHelper) {
    routerHelper.configureStates(states, '/instances');
}
