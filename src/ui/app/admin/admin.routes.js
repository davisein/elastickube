import { module } from 'admin/admin.module';
import routerHelperName from 'blocks/router/router-helper';

module
    .run(appRun);

appRun.$inject = [ routerHelperName ];

function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [ {
        state: 'admin',
        config: {
            template: '<div>Admin</div>',
            url: '/admin',
            data: {
                header: 3,
                roles: ['admin']
            }
        }
    } ];
}
