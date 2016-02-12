angular
    .module('app.core')
    .config(configure);

configure.$inject = ['$animateProvider', '$mdThemingProvider'];

function configure($animateProvider, $mdThemingProvider) {
    configureAnimation($animateProvider);
    configureTheming($mdThemingProvider);
}

function configureAnimation($animateProvider) {
    $animateProvider.classNameFilter(/\banimate\b/);
}

function configureTheming($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('cyan');
}
