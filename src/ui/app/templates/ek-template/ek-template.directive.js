import './ek-template.less';
import controller from './ek-template.controller';
import template from './ek-template.html';

import { module } from 'templates/templates.module';

module.directive('ekTemplate', ekTemplate);

ekTemplate.$inject = [];

function ekTemplate() {
    return {
        restrict: 'E',
        compile,
        controller,
        controllerAs: 'ctrl',
        template
    };
}

function compile($element) {
    $element.addClass('ek-template');
}
