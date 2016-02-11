import './ek-templates-sorter.less';

import { module } from 'templates/templates.module';
import controller from './ek-templates-sorter.controller';
import template from './ek-templates-sorter.html';

module.directive('ekTemplatesSorter', () => ({
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
    tElement.addClass('ek-templates-sorter');
}
