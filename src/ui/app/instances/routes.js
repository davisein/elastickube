angular
    .module('app.instances')
    .config(instancesRoutes);

const states = [{
    state: 'private.instances',
    config: {
        template: '<ek-instances></ek-instances>',
        url: '/:namespace/instances',
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
    const defaultNamespace = 'engineering';

    routerHelper.configureStates(states, `${defaultNamespace}/instances`);
}
