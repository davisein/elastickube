import './ek-header.less';
import template from './ek-header.html';

import EKHeaderController from './ek-header.controller';
import { module } from 'widgets/widgets.module';

module.directive('ekHeader', ekHeader);

ekHeader.$inject = [];

function ekHeader() {
    return {
        restrict: 'E',
        controllerAs: 'ctrl',
        controller: EKHeaderController,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-header');
    }
}
