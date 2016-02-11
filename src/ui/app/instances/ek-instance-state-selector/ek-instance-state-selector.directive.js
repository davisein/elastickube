import './ek-instance-state-selector.less';
import controller from './ek-instance-state-selector.controller';
import template from './ek-instance-state-selector.html';

angular
    .module('app.instances')
    .directive('ekInstanceStateSelector', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            instances: '=',
            selectedState: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-instance-state-selector')
        .attr('layout', 'column');
}
