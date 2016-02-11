import './ek-admin.less';
import template from './ek-admin.html';

angular
    .module('app.admin')
    .directive('ekAdmin', () => ({
        restrict: 'E',
        scope: {},
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-admin')
        .attr('layout', 'column');
}
