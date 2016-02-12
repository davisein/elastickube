import './ek-header.less';
import constants from '../constants';
import controller from './ek-header.controller';
import template from './ek-header.html';

angular
    .module('app.widgets')
    .directive('ekHeader', () => ({
        restrict: 'E',
        scope: true,
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-header')
        .attr('layout', 'row')
        .attr('layout-align', 'start');

    return ($scope) => _.extend($scope, constants);
}
