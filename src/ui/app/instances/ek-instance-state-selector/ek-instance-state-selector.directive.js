import './ek-instance-state-selector.less';
import { module } from 'instances/instances.module';
import controller from './ek-instance-state-selector.controller';
import template from './ek-instance-state-selector.html';

module.directive('ekInstanceStateSelector', ekInstanceStateSelector);

function ekInstanceStateSelector() {
    return {
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
    };

    function compile($element) {
        $element
            .addClass('ek-instance-state-selector')
            .attr('layout', 'column');
    }
}
