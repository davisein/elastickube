import './ek-instances.less';
import template from './ek-instances.html';

import { module } from 'instances/instances.module';

module.directive('ekInstances', ekInstances);

ekInstances.$inject = [];

function ekInstances() {
    return {
        restrict: 'E',
        scope: true,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-instances')
            .attr('layout', 'column');
    }
}
