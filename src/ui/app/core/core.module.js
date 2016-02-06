import 'angular-new-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material';

const name = 'app.core';

const module = angular
    .module(name, [
        'ngMaterial',
        'ngAnimate',
        'ngNewRouter'
    ]);

export { name, module };
