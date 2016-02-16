import './core.less';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material/angular-material';

import routerModule from 'blocks/router/module';
import securityModule from 'blocks/security/module';
import sessionModule from 'blocks/session/module';

import APICommunicationService from 'blocks/api/api-communication.service';
import InstancesAPI from 'blocks/api/instances-api';
import InstancesActionCreator from 'blocks/actions/instances/instances-action-creator';
import InstancesStoreService from 'blocks/stores/instances/instances-store.service';
import humanizeDateFilter from './filters/humanize-date.filter';
import MultiTranscludeService from './services/multi-transclude.service';
import ElasticKubeDispatcher from 'blocks/dispatcher/dispatcher';

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
    .run(($injector, instancesActionCreator)=> {
        'ngInject';

        $injector.get('instancesAPI');

        // FIXME To be removed when the change namespace feature is developed
        instancesActionCreator.preload('defaultNamespace');
    })
    .filter('ekHumanizeDate', () => humanizeDateFilter)
    .service('multiTransclude', MultiTranscludeService)
    .service('apiCommunication', APICommunicationService)
    .service('instancesAPI', InstancesAPI)
    .service('instancesActionCreator', InstancesActionCreator)
    .service('instancesStore', InstancesStoreService)
    .service('elasticKubeDispatcher', ElasticKubeDispatcher);

export default moduleName;
