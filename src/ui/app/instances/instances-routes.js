function instancesRoutes(routerHelperProvider) {
    'ngInject';

    const defaultNamespace = 'engineering';

    routerHelperProvider.configureStates([{
        state: 'private.instances',
        config: {
            template: '<ek-instances></ek-instances>',
            resolve: {
                loading: ['instancesStore', (instancesStore) => {
                    return instancesStore.loading();
                }]
            },
            url: '/:namespace/instances',
            data: {
                header: {
                    name: 'instances',
                    position: 1
                }
            }
        }
    }], `${defaultNamespace}/instances`);
}

export default instancesRoutes;
