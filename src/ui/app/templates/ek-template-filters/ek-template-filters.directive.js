import './ek-template-filters.less';
import controller from './ek-template-filters.controller';
import template from './ek-template-filters.html';

angular
    .module('app.templates')
    .directive('ekTemplateFilters', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            templatesToFilter: '=',
            filteredTemplates: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement
        .addClass('ek-template-filters')
        .attr('layout', 'column');
}
