import './ek-template-card.less';
import controller from './ek-template-card.controller';
import template from './ek-template-card.html';

angular
    .module('app.templates')
    .directive('ekTemplateCard', () => ({
        restrict: 'E',
        bindToController: {
            template: '='
        },
        controllerAs: 'ctrl',
        controller,
        template,
        compile
    }));

function compile(tElement) {
    tElement
        .addClass('ek-template-card')
        .attr('layout', 'column');
}
