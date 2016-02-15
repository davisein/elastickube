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

function instancesRoutes(routerHelperProvider) {
    'ngInject';
    const defaultNamespace = 'engineering';

    routerHelperProvider.configureStates(states, `${defaultNamespace}/instances`);
}

export default instancesRoutes;
