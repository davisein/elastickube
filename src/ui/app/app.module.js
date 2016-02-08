import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';
import { name as adminModule } from 'admin/admin.module';
import { name as instancesModule } from 'instances/instances.module';
import { name as templatesModule } from 'templates/templates.module';

const name = 'app';

const module = angular.module(name, [

    /* Shared modules */
    coreModule,
    layoutModule,

    /* Feature areas */
    adminModule,
    instancesModule,
    templatesModule
]);

export { name, module };
