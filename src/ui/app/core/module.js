import './core.less';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material/angular-material';

import apiModule from 'blocks/api/module';
import dataflowModule from 'blocks/dataflow/module';
import routerModule from 'blocks/router/module';
import securityModule from 'blocks/security/module';
import sessionModule from 'blocks/session/module';

import humanizeDateFilter from './filters/humanize-date.filter';
import MultiTranscludeService from './services/multi-transclude.service';

const moduleName = 'app.core';

angular
    .module(moduleName, [
        'ngMaterial',
        'ngAnimate',
        'ngMessages',
        apiModule,
        dataflowModule,
        routerModule,
        securityModule,
        sessionModule
    ])
    .filter('ekHumanizeDate', () => humanizeDateFilter)
    .service('multiTransclude', MultiTranscludeService);

export default moduleName;
