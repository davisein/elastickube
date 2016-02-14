import profiles from './profiles';

angular
    .module('blocks.security')
    .provider('auth', authProvider);

const ELASTICKUBE_TOKEN = 'ElasticKube-Token';

function authProvider() {
    this.$get = Auth;
}

Auth.$inject = ['$cookies', 'routerHelper', 'session'];

function Auth($cookies, routerHelper, session) {
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
        routerHelper.changeToState('anonymous.login');
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
                return !isLoggedIn();
        }
    }
}
