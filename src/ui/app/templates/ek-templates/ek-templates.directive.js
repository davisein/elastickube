import './ek-templates.less';
import template from './ek-templates.html';

import _ from 'lodash';
import EKTemplatesController from './ek-templates.controller';
import constants from 'templates/templates.constants';
import { module } from 'templates/templates.module';

module.directive('ekTemplates', ekTemplates);

ekTemplates.$inject = [];

function ekTemplates() {
    return {
        restrict: 'E',
        scope: true,
        controllerAs: 'ctrl',
        controller: EKTemplatesController,
        compile,
        template
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
