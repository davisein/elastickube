import './core.less';

import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material';

import routerModule from 'blocks/router/module';
import securityModule from 'blocks/security/module';
import sessionModule from 'blocks/session/module';

import animateConfig from './config/animate-config';
import themeConfig from './config/theme-config';
import humanizeDateFilter from './filters/humanize-date.filter';
import MultiTranscludeService from './services/multi-transclude.service';

const moduleName = 'app.core';

angular
    .module(moduleName, [
        'ngMaterial',
        'ngAnimate',
        routerModule,
        securityModule,
        sessionModule
    ])
    .config(animateConfig)
    .config(themeConfig)
    .filter('ekHumanizeDate', () => humanizeDateFilter)
    .service('multiTransclude', MultiTranscludeService);

export default moduleName;
