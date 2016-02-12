import './ek-instance-list.less';
import controller from './ek-instance-list.controller';
import template from './ek-instance-list.html';

angular
    .module('app.instances')
    .directive('ekInstanceList', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            instances: '=?'
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-instance-list');
}
