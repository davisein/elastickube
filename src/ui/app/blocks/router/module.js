import 'ui-router';

import routerHelperProvider from './router-helper.provider';
import routerConfiguration from './router-config';

const moduleName = 'blocks.router';

angular
    .module(moduleName, [
        'ui.router'
    ])
    .provider('routerHelper', routerHelperProvider)
    .config(routerConfiguration);

export default moduleName;
