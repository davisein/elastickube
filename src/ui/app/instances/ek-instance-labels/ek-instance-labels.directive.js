import './ek-instance-labels.less';
import constants from '../constants';
import template from './ek-instance-labels.html';

angular
    .module('app.instances')
    .directive('ekInstanceLabels', () => ({
        restrict: 'E',
        scope: {
            instance: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-instance-labels');

    return ($scope) => _.extend($scope, constants);
}
