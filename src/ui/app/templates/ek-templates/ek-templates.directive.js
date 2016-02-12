import './ek-templates.less';
import constants from '../constants';
import controller from './ek-templates.controller';
import template from './ek-templates.html';

angular
    .module('app.templates')
    .directive('ekTemplates', () => ({
        restrict: 'E',
        scope: {},
        controllerAs: 'ctrl',
        controller,
        template,
        compile
    }));

function compile(tElement) {
    tElement
        .addClass('ek-templates')
        .attr('layout', 'column');

    return ($scope) => _.extend($scope, constants);
}
