import { module } from 'instances/instances.module';
import routerHelperName from 'blocks/router/router-helper';

module.run(appRun);

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

appRun.$inject = [routerHelperName];

function appRun(routerHelper) {
    routerHelper.configureStates(states, '/instances');
}
