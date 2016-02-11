import './ek-instance-filters.less';
import controller from './ek-instance-filters.controller';
import template from './ek-instance-filters.html';

angular
    .module('app.instances')
    .directive('ekInstanceFilters', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            instancesToFilter: '=',
            filteredInstances: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-instance-filters')
        .attr('layout', 'column');
}
