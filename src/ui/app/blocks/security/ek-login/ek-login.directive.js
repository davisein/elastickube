import './ek-login.less';
import template from './ek-login.html';

angular
    .module('blocks.security')
    .directive('ekLogin', () => ({
        restrict: 'E',
        scope: {},
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-login')
        .attr('layout', 'column');
}
