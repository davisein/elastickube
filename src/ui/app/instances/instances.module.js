import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';
import { name as widgetsModule } from 'widgets/widgets.module';
import { name as routerModule } from 'blocks/router/router.module';

const name = 'app.instances';

const module = angular.module(name, [
    coreModule,
    layoutModule,
    widgetsModule,
    routerModule
]);

export { name, module };
