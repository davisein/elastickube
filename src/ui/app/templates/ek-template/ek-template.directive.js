import './ek-template.less';

import { module } from 'templates/templates.module';
import controller from './ek-template.controller';
import template from './ek-template.html';

module.directive('ekTemplate', () => ({
    restrict: 'E',
    controllerAs: 'ctrl',
    controller,
    template,
    compile
}));

function compile(tElement) {
    tElement.addClass('ek-template');
}
