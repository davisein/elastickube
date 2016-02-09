import './ek-table.less';
import { module } from 'widgets/widgets.module';
import controller from './ek-table.controller';
import template from './ek-table.html';

module.directive('ekTable', ekTable);

ekTable.$inject = [];

function ekTable() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        bindToController: {
            headers: '=',
            tableItems: '=',
            headerClickListener: '&?'
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-table');

        return link;
    }

    function link($scope, iElement, iAttrs, $controller) {
        if (angular.isFunction($controller.headerClickListener) && angular.isFunction($controller.headerClickListener())) {
            $controller.headerClickListener = $controller.headerClickListener();
        }
    }
}
