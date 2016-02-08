import './ek-templates.less';
import template from './ek-templates.html';

import { module } from 'templates/templates.module';

module.directive('ekTemplates', ekTemplates);

ekTemplates.$inject = [];

function ekTemplates() {
    return {
        restrict: 'E',
        scope: true,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-templates')
            .attr('layout', 'column');
    }
}
