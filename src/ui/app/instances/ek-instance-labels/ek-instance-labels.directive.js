import './ek-instance-labels.less';
import { module } from 'instances/instances.module';
import constants from 'instances/instances.constants';
import template from './ek-instance-labels.html';

module.directive('ekInstanceLabels', ekInstanceLabels);

function ekInstanceLabels() {
    return {
        restrict: 'E',
        scope: {
            instance: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-instance-labels');
        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
