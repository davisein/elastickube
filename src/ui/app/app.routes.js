import { module } from 'app.module';

module
    .controller('AppRoutesController', AppRoutesController);

AppRoutesController.$inject = [ '$router' ];

function AppRoutesController($router) {
    $router.config({
        path: '/',
        component: {
            content: 'templates'
        }
    });
}
