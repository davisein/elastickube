angular
    .module('blocks.router')
    .config(configureRouter);

configureRouter.$inject = ['$locationProvider'];

function configureRouter($locationProvider) {
    $locationProvider.html5Mode(true);
}
