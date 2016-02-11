import './ek-template-type-selector.less';

import { module } from 'templates/templates.module';
import controller from './ek-template-type-selector.controller';
import template from './ek-template-type-selector.html';

module.directive('ekTemplateTypeSelector', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        templates: '=',
        model: '=ngModel'
    },
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement
        .addClass('ek-template-type-selector')
        .attr('layout', 'column');
}
