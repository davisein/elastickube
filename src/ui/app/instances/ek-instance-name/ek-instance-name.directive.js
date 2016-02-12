import './ek-instance-name.less';
import template from './ek-instance-name.html';

angular
    .module('app.instances')
    .directive('ekInstanceName', () => ({
        restrict: 'E',
        scope: {
            instance: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-instance-name');
}
