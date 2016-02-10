import './ek-instance-state.less';

import { module } from 'instances/instances.module';

import template from './ek-instance-state.html';

module.directive('ekInstanceState', ekInstanceState);

function ekInstanceState() {
    return {
        restrict: 'E',
        scope: {
            instance: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-instance-state');
    }
}
