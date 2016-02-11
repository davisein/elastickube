import './ek-instance-state.less';

import { module } from 'instances/instances.module';
import template from './ek-instance-state.html';

module.directive('ekInstanceState', () => ({
    restrict: 'E',
    scope: {
        instance: '='
    },
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-instance-state');
}
