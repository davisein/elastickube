import './ek-instance-list.less';
import { module } from 'instances/instances.module';
import controller from './ek-instance-list.controller';
import template from './ek-instance-list.html';

module.directive('ekInstanceList', ekInstanceList);

function ekInstanceList() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            instances: '=?'
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-instance-list');
    }
}
