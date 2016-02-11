import './ek-button-group.less';

import { module } from 'widgets/widgets.module';
import template from './ek-button-group.html';

module.directive('ekButtonGroup', () => ({
    restrict: 'E',
    transclude: true,
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-button-group');
}
