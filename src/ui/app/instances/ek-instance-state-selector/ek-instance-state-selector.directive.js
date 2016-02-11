import './ek-instance-state-selector.less';

import { module } from 'instances/instances.module';
import controller from './ek-instance-state-selector.controller';
import template from './ek-instance-state-selector.html';

module.directive('ekInstanceStateSelector', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        instances: '=',
        model: '=ngModel'
    },
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement
        .addClass('ek-instance-state-selector')
        .attr('layout', 'column');
}