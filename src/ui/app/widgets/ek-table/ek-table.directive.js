import './ek-table.less';

import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-table.controller';
import template from './ek-table.html';

module.directive('ekTable', () => ({
    restrict: 'E',
    transclude: true,
    scope: {},
    bindToController: {
        headers: '=',
        initialSelection: '=',
        initialOrder: '@',
        headerClickListener: '&?'
    },
    controller,
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-table');

    return ($scope, iElement, iAttrs, $controller) => {
        _.extend($scope, constants);
        $controller.currentSelection = $controller.initialSelection;
        $controller.sortOrder = $controller.initialOrder;
        if (angular.isFunction($controller.headerClickListener)
            && angular.isFunction($controller.headerClickListener())) {
            $controller.headerClickListener = $controller.headerClickListener();
        }
    };
}
