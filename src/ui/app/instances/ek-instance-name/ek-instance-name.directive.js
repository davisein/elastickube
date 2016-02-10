import './ek-instance-name.less';

import { module } from 'instances/instances.module';
import template from './ek-instance-name.html';

module.directive('ekInstanceName', () => ({
    restrict: 'E',
    scope: {
        instance: '='
    },
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-instance-name');
}
