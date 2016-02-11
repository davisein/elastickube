import './ek-templates.less';

import { module } from 'templates/templates.module';
import constants from 'templates/templates.constants';
import controller from './ek-templates.controller';
import template from './ek-templates.html';

module.directive('ekTemplates', () => ({
    restrict: 'E',
    scope: {},
    controllerAs: 'ctrl',
    controller,
    template,
    compile
}));

function compile(tElement) {
    tElement
        .addClass('ek-templates')
        .attr('layout', 'column');

    return ($scope) => _.extend($scope, constants);
}
