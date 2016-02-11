import './ek-table.less';

import { module } from 'widgets/widgets.module';
import template from './ek-table.html';

module.directive('ekTable', () => ({
    restrict: 'E',
    transclude: true,
    scope: {},
    bindToController: {
        headers: '=',
        tableItems: '=',
        headerClickListener: '&?'
    },
    controllerAs: 'ctrl',
    controller: angular.noop,
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-table');

    return ($scope, iElement, iAttrs, $controller) => {
        if (angular.isFunction($controller.headerClickListener)
            && angular.isFunction($controller.headerClickListener())) {
            $controller.headerClickListener = $controller.headerClickListener();
        }
    };
}
