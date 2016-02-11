import './ek-template-card.less';

import { module } from 'templates/templates.module';
import controller from './ek-template-card.controller';
import template from './ek-template-card.html';

module.directive('ekTemplateCard', () => ({
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
