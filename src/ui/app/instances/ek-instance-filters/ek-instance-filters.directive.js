import './ek-instance-filters.less';
import { module } from 'instances/instances.module';
import controller from './ek-instance-filters.controller';
import template from './ek-instance-filters.html';

module.directive('ekInstanceFilters', ekInstanceFilters);

function ekInstanceFilters() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            input: '=',
            output: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-instance-filters')
            .attr('layout', 'column');
    }
}
