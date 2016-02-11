import './ek-template-name.less';

import { module } from 'templates/templates.module';
import template from './ek-template-name.html';

module.directive('ekTemplateName', () => ({
    restrict: 'E',
    scope: {
        template: '='
    },
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-template-name');
}
