import actions from './actions';
import DispatcherService from './dispatcher.service';
import InstancesActionCreatorService from './instances-action-creator.service';
import InstancesStoreService from './instances-store.service';
import NamespacesActionCreatorService from './namespaces-action-creator.service';
import NamespacesStoreService from './namespaces-store.service';
import SessionActionCreatorService from './session-action-creator.service';
import SessionStoreService from './session-store.service';

const moduleName = 'blocks.dataflow';

angular
    .module(moduleName, [])
    .constant('actions', actions)
    .service('dispatcher', DispatcherService)
    .service('instancesActionCreator', InstancesActionCreatorService)
    .service('instancesStore', InstancesStoreService)
    .service('namespacesActionCreator', NamespacesActionCreatorService)
    .service('namespacesStore', NamespacesStoreService)
    .service('sessionActionCreator', SessionActionCreatorService)
    .service('sessionStore', SessionStoreService);

export default moduleName;
