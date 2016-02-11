import './ek-template-type-selector.less';
import controller from './ek-template-type-selector.controller';
import template from './ek-template-type-selector.html';

angular
    .module('app.templates')
    .directive('ekTemplateTypeSelector', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            templates: '=',
            selectedType: '='
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
