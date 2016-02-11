import { module } from 'templates/templates.module';
import routerHelperName from 'blocks/router/router-helper';

module.run(appRun);

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

appRun.$inject = [routerHelperName];

function appRun(routerHelper) {
    routerHelper.configureStates(states);
}
