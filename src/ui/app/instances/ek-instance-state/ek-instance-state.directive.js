import './ek-instance-state.less';
import template from './ek-instance-state.html';

angular
    .module('app.instances')
    .directive('ekInstanceState', () => ({
        restrict: 'E',
        scope: {
            instance: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-instance-state');
}
