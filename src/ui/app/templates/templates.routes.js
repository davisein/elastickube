import { module } from 'templates/templates.module';
import routerHelperName from 'blocks/router/router-helper';

module
    .run(appRun);

appRun.$inject = [ routerHelperName ];

function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [ {
        state: 'templates',
        config: {
            template: '<div>templates</div>',
            url: '/templates',
            data: {
                header: 2
            }
        }
    } ];
}
