import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';
import { name as routerModule } from 'blocks/router/router.module';
import { name as widgetsModule } from 'widgets/widgets.module';

const name = 'app.templates';

const module = angular.module(name, [
    coreModule,
    layoutModule,
    routerModule,
    widgetsModule
]);

export { name, module };
