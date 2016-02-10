import './ek-instances.less';

import { module } from 'instances/instances.module';
import controller from './ek-instances.controller';
import constants from 'instances/instances.constants';
import template from './ek-instances.html';

module.directive('ekInstances', () => ({
    restrict: 'E',
    scope: {},
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement
        .addClass('ek-instances')
        .attr('layout', 'column');

    return ($scope) => _.extend($scope, constants);
}
