angular
    .module('app.core')
    .provider('routerHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerHelperProvider($stateProvider, $urlRouterProvider) {
    this.$get = RouterHelper;

    RouterHelper.$inject = ['$state'];

    function RouterHelper($state) {
        let hasOtherwise = false;

        return {
            changeToState,
            configureStates,
            getStates
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

        function changeToState(state) {
            $state.go(state);
        }
    }
}
