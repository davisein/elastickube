import './ek-button-group.less';
import { module } from 'widgets/widgets.module';
import template from './ek-button-group.html';

module.directive('ekButtonGroup', ekButtonGroup);

function ekButtonGroup() {
    return {
        restrict: 'E',
        transclude: true,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-button-group');
    }
}
