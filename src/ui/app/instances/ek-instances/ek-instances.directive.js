import './ek-instances.less';
import constants from '../constants';
import controller from './ek-instances.controller';
import template from './ek-instances.html';

angular
    .module('app.instances')
    .directive('ekInstances', () => ({
        restrict: 'E',
        scope: {},
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-instances')
        .attr('layout', 'column');

    return ($scope) => _.extend($scope, constants);
}
