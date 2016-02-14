angular
    .module('blocks.session')
    .provider('session', sessionProvider);

function sessionProvider() {
    this.$get = Session;
}

function Session() {
    let session = {};

    initialize();

    return {
        destroy,
        getItem,
        removeItem,
        setItem
    };

    function initialize() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            session[key] = JSON.parse(localStorage.getItem(key));
        }
    }

    function getItem(key) {
        return session[key];
    }

    function setItem(key, value) {
        session[key] = value;
        localStorage.setItem(key, JSON.stringify(value));
    }

    function removeItem(key) {
        delete session[key];
        localStorage.removeItem(key);
    }

    function destroy() {
        session = {};
        localStorage.clear();
    }
}
