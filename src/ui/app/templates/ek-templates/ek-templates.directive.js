import './ek-templates.less';
import { module } from 'templates/templates.module';
import constants from 'templates/templates.constants';
import controller from './ek-templates.controller';
import template from './ek-templates.html';

module.directive('ekTemplates', ekTemplates);

ekTemplates.$inject = [];

function ekTemplates() {
    return {
        restrict: 'E',
        scope: {},
        controllerAs: 'ctrl',
        controller,
        template,
        compile
    };

    function compile($element) {
        $element
            .addClass('ek-templates')
            .attr('layout', 'column');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
