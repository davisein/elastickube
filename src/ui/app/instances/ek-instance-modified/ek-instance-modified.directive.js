import './ek-instance-modified.less';

import { module } from 'instances/instances.module';

import template from './ek-instance-modified.html';

module.directive('ekInstanceModified', ekInstanceModified);

function ekInstanceModified() {
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
        $element.addClass('ek-instance-modified');
    }
}
