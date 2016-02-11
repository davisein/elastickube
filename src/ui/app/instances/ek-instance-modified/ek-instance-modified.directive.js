import './ek-instance-modified.less';
import controller from './ek-instance-modified.controller';
import template from './ek-instance-modified.html';

angular
    .module('app.instances')
    .directive('ekInstanceModified', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            instance: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-instance-modified');
}
