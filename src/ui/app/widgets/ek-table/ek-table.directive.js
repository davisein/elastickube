import './ek-table.less';
import template from './ek-table.html';
import EKTableController from './ek-table.controller';

import { module } from 'widgets/widgets.module';

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
        controller: EKTableController,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-table');
        return {
            post: ($scope, iElement, iAttrs, controller) => {
                if (angular.isFunction(controller.headerClickListener) && angular.isFunction(controller.headerClickListener())) {
                    controller.headerClickListener = controller.headerClickListener();
                }
            }
        };
    }
}
