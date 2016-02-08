import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material';

import { name as routerModule } from 'blocks/router/router.module';

const name = 'app.core';

const module = angular.module(name, [
    'ngMaterial',
    'ngAnimate',

    routerModule
]);

export { name, module };
