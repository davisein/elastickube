import './ek-instances.less';
import { module } from 'instances/instances.module';
import controller from './ek-instances.controller';
import constants from 'instances/instances.constants';
import template from './ek-instances.html';

module.directive('ekInstances', ekInstances);

function ekInstances() {
    return {
        restrict: 'E',
        scope: {},
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-instances')
            .attr('layout', 'column');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
