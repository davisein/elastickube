import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';
import { name as routerModule } from 'blocks/router/router.module';

const name = 'app.admin';

const module = angular.module(name, [
    coreModule,
    layoutModule,

    routerModule
]);

export { name, module };
