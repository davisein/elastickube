import './ek-instance-modified.less';

import { module } from 'instances/instances.module';
import template from './ek-instance-modified.html';

module.directive('ekInstanceModified', () => ({
    restrict: 'E',
    scope: {
        instance: '='
    },
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-instance-modified');
}
