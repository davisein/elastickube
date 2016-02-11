angular
    .module('app.templates')
    .run(templatesRoutes);

const states = [{
    state: 'templates',
    config: {
        template: '<ek-templates></ek-templates>',
        url: '/templates',
        data: {
            header: 2
        }
    }
}];

templatesRoutes.$inject = ['routerHelper'];

function templatesRoutes(routerHelper) {
    routerHelper.configureStates(states);
}
