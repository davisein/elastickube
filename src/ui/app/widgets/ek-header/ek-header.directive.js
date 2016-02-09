import './ek-header.less';
import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-header.controller';
import template from './ek-header.html';

module.directive('ekHeader', ekHeader);

ekHeader.$inject = [];

function ekHeader() {
    return {
        restrict: 'E',
        scope: true,
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-header')
            .attr('layout', 'row')
            .attr('layout-align', 'start');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
