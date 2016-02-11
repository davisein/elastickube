import './ek-template-filters.less';

import { module } from 'templates/templates.module';
import controller from './ek-template-filters.controller';
import template from './ek-template-filters.html';

module.directive('ekTemplateFilters', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        input: '=',
        output: '='
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
