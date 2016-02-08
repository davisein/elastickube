import { module } from 'instances/instances.module';
import routerHelperName from 'blocks/router/router-helper';

module.run(appRun);

appRun.$inject = [ routerHelperName ];

function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [ {
        state: 'instances',
        config: {
            template: '<div>Instances</div>',
            url: '/instances',
            data: {
                header: 1
            }
        }
    } ];
}
