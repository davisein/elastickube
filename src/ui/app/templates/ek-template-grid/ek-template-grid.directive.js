import './ek-template-grid.less';

import { module } from 'templates/templates.module';
import template from './ek-template-grid.html';

module.directive('ekTemplateGrid', () => ({
    restrict: 'E',
    scope: {
        templates: '=?'
    },
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-template-grid');
}
