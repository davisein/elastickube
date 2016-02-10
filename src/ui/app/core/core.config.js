import { module } from 'core/core.module';

module.config(configure);

configure.$inject = ['$animateProvider', '$locationProvider', '$mdThemingProvider'];

function configure($animateProvider, $locationProvider, $mdThemingProvider) {
    configureAnimation($animateProvider);
    configureRouter($locationProvider);
    configureTheming($mdThemingProvider);
}

function configureAnimation($animateProvider) {
    $animateProvider.classNameFilter(/\banimate\b/);
}

function configureRouter($locationProvider) {
    $locationProvider.html5Mode(true);
}

function configureTheming($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('cyan');
}
