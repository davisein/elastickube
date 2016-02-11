import './ek-template-list.less';

import { module } from 'templates/templates.module';
import controller from './ek-template-list.controller';
import template from './ek-template-list.html';

module.directive('ekTemplateList', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        templates: '=?'
    },
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-template-list');
}
