angular
    .module('app.templates')
    .config(templatesRoutes);

const states = [{
    state: 'private.templates',
    config: {
        template: '<ek-templates></ek-templates>',
        url: '/templates',
        data: {
            header: {
                name: 'templates',
                position: 2
            }
        }
    }
}];

templatesRoutes.$inject = ['routerHelperProvider'];

function templatesRoutes(routerHelper) {
    routerHelper.configureStates(states);
}
