import './core.less';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material/angular-material';

import routerModule from 'blocks/router/module';
import securityModule from 'blocks/security/module';
import sessionModule from 'blocks/session/module';

import APICommunicationService from 'blocks/api/api-communication.service';
import InstancesAPIService from 'blocks/api/instances-api';
import NamespacesAPIService from 'blocks/api/namespaces-api';

import InstancesActionCreatorService from 'blocks/actions/instances/instances-action-creator';
import NamespacesActionCreatorService from 'blocks/actions/namespaces/namespaces-action-creator';
import SessionActionCreatorService from 'blocks/actions/session/session-action-creator';

import InstancesStoreService from 'blocks/stores/instances/instances-store.service';
import NamespacesStoreService from 'blocks/stores/namespaces/namespaces-store.service';
import SessionStoreService from 'blocks/stores/session/session-store.service';

import humanizeDateFilter from './filters/humanize-date.filter';
import MultiTranscludeService from './services/multi-transclude.service';
import ElasticKubeDispatcherService from 'blocks/dispatcher/dispatcher';

const moduleName = 'app.core';

angular
    .module(moduleName, [
        'ngMaterial',
        'ngAnimate',
        'ngMessages',
        routerModule,
        securityModule,
        sessionModule
    ])
    .run(($injector, instancesActionCreator, namespacesActionCreator)=> {
        'ngInject';

        $injector.get('instancesAPI');
        $injector.get('namespacesAPI');

        // FIXME To be removed when the change namespace feature is developed
        instancesActionCreator.preload();
        namespacesActionCreator.preload();
    })
    .filter('ekHumanizeDate', () => humanizeDateFilter)
    .service('multiTransclude', MultiTranscludeService)
    .service('apiCommunication', APICommunicationService)
    .service('instancesAPI', InstancesAPIService)
    .service('namespacesAPI', NamespacesAPIService)
    .service('instancesActionCreator', InstancesActionCreatorService)
    .service('namespacesActionCreator', NamespacesActionCreatorService)
    .service('sessionActionCreator', SessionActionCreatorService)
    .service('instancesStore', InstancesStoreService)
    .service('namespacesStore', NamespacesStoreService)
    .service('sessionStore', SessionStoreService)
    .service('elasticKubeDispatcher', ElasticKubeDispatcherService);

export default moduleName;
