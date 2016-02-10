import './ek-instance-name.less';

import { module } from 'instances/instances.module';

import template from './ek-instance-name.html';

module.directive('ekInstanceName', ekInstanceName);

function ekInstanceName() {
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
        $element.addClass('ek-instance-name');
    }
}
