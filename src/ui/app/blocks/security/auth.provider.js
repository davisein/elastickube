import profiles from './profiles';

angular
    .module('blocks.security')
    .provider('auth', authProvider);

const ELASTICKUBE_TOKEN = 'ElasticKube-Token';

function authProvider() {
    this.$get = Auth;

    Auth.$inject = ['$cookies', 'routerHelper'];

    function Auth($cookies, routerHelper) {
        return {
            authorize,
            isLoggedIn,
            isAdmin,
            logout
        };

        function isLoggedIn() {
            return !!$cookies.get(ELASTICKUBE_TOKEN);
        }

        function logout() {
            $cookies.remove(ELASTICKUBE_TOKEN);
            routerHelper.changeToState('public.login');
        }

        function isAdmin() {
            return false;
        }

        function authorize(access) {
            switch (access) {
                case profiles.ADMIN:
                    return isAdmin();
                case profiles.PRIVATE:
                    return isLoggedIn();
                default:
                    return true;
            }
        }
    }
}
