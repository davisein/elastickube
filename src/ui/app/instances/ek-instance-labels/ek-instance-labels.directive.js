import './ek-instance-labels.less';

import { module } from 'instances/instances.module';
import constants from 'instances/instances.constants';
import template from './ek-instance-labels.html';

module.directive('ekInstanceLabels', () => ({
    restrict: 'E',
    scope: {
        instance: '='
    },
    controllerAs: 'ctrl',
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-instance-labels');

    return ($scope) => _.extend($scope, constants);
}
