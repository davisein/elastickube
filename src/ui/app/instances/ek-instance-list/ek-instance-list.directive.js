import './ek-instance-list.less';
import template from './ek-instance-list.html';
import EKInstanceListController from './ek-instance-list.controller';

import { module } from 'instances/instances.module';

module.directive('ekInstanceList', ekInstanceList);

ekInstanceList.$inject = [];

function ekInstanceList() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            instances: '=?'
        },
        compile,
        controllerAs: 'ctrl',
        controller: EKInstanceListController,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-instance-list');
    }
}
