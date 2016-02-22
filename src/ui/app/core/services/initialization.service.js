import constants from 'constants';

class InitializationService {

    /* eslint max-params: 0 */
    constructor($q, $cookies, namespacesActionCreator, namespacesStore, principalActionCreator, sessionActionCreator, sessionStore,
                usersActionCreator) {
        'ngInject';

        this._$q = $q;
        this._$cookies = $cookies;
        this._namespacesActionCreator = namespacesActionCreator;
        this._namespacesStore = namespacesStore;
        this._principalActionCreator = principalActionCreator;
        this._sessionActionCreator = sessionActionCreator;
        this._sessionStore = sessionStore;
        this._usersActionCreator = usersActionCreator;

        this.deferred = $q.defer();
        this.initialized = false;
    }

    execute() {
        const sessionToken = this._$cookies.get(constants.SESSION_TOKEN_NAME);
        const sessionDestroyed = sessionToken !== this._sessionStore.getSessionToken()
            ? this._sessionActionCreator.destroy().then(() => this._sessionActionCreator.storeSessionToken(sessionToken))
            : false;

        return this._$q.when(sessionDestroyed)
            .then(() => this._principalActionCreator.loggedIn())
            .then(() => this._namespacesActionCreator.subscribe())
            .then(() => {
                let namespace = this._sessionStore.getActiveNamespace();

                if (_.isUndefined(namespace)) {
                    namespace = _.chain(this._namespacesStore.getAll())
                        .first()
                        .value();
                }

                return this._sessionActionCreator.selectNamespace(namespace);
            })
            .then(() => {
                if (!this.initialized) {
                    this.initialized = true;
                    this.deferred.resolve();
                }
            });
    }
}

export default InitializationService;
