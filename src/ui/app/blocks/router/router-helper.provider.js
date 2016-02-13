angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerHelperProvider($stateProvider, $urlRouterProvider) {
    const self = this;
    let hasOtherwise = false;

    self.$get = RouterHelper;
    self.configureStates = configureStates;

    function configureStates(states, otherwisePath) {
        states.forEach(function(state) {
            $stateProvider.state(state.state, state.config);
        });

        if (otherwisePath && !hasOtherwise) {
            hasOtherwise = true;
            $urlRouterProvider.otherwise(otherwisePath);
        }
    }

    RouterHelper.$inject = ['$state'];

    function RouterHelper($state) {
        return {
            changeToState,
            getStates
        };

        function getStates() {
            return $state.get();
        }

        function changeToState(state, params) {
            $state.go(state, params);
        }
    }
}
