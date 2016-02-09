import './ek-template.less';
import { module } from 'templates/templates.module';
import controller from './ek-template.controller';
import template from './ek-template.html';

module.directive('ekTemplate', ekTemplate);

function ekTemplate() {
    return {
        restrict: 'E',
        controllerAs: 'ctrl',
        controller,
        template,
        compile
    };
}

function compile($element) {
    $element.addClass('ek-template');
}
