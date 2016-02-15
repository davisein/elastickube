import 'angular';

import coreModule from 'core/module';
import layoutModule from 'layout/module';
import widgetsModule from 'widgets/module';

import adminModule from 'admin/module';
import instancesModule from 'instances/module';
import templatesModule from 'templates/module';

angular
    .module('app', [

        /* Shared modules */
        coreModule,
        layoutModule,
        widgetsModule,

        /* Feature areas */
        adminModule,
        instancesModule,
        //templatesModule
    ]);
