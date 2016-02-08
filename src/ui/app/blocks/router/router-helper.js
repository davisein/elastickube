import { module } from 'blocks/router/router.module';

const name = 'routerHelper';

module.provider(name, routerHelperProvider);

routerHelperProvider.$inject = [ '$locationProvider', '$stateProvider', '$urlRouterProvider' ];

function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    this.$get = RouterHelper;

    $locationProvider.html5Mode(true);

    RouterHelper.$inject = [ '$state' ];

    function RouterHelper($state) {
        let hasOtherwise = false;

        return {
            configureStates,
            getStates,
            go
        };

        function configureStates(states, otherwisePath) {
            states.forEach(function(state) {
                $stateProvider.state(state.state, state.config);
            });

            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                $urlRouterProvider.otherwise(otherwisePath);
            }
        }

        function getStates() {
            return $state.get();
        }

        function go(state) {
            $state.go(state);
        }
    }
}

export default name;
