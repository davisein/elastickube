import { module } from 'app.module';

module.config(configure);

configure.$inject = ['$locationProvider'];

function configure($locationProvider) {
    $locationProvider.html5Mode(true);
}
