import './ek-button-group.less';
import template from './ek-button-group.html';

angular
    .module('app.widgets')
    .directive('ekButtonGroup', () => ({
        restrict: 'E',
        transclude: true,
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-button-group');
}
