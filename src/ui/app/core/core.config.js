import { module } from 'core/core.module';

module.config(configure);

configure.$inject = ['$animateProvider', '$locationProvider'];

function configure($animateProvider, $locationProvider) {
    configureAnimation($animateProvider);
    configureRouter($locationProvider);
}

function configureAnimation($animateProvider) {
    $animateProvider.classNameFilter(/\banimate\b/);
}

function configureRouter($locationProvider) {
    $locationProvider.html5Mode(true);
}
