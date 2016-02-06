import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';
import { name as templatesModule } from 'templates/templates.module';

const name = 'app';

const module = angular.module(name, [

    /* Shared modules */
    coreModule,
    layoutModule,

    /* Feature areas */
    templatesModule
]);

export { name, module };
