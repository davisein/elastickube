import './ek-admin.less';
import template from './ek-admin.html';

import { module } from 'admin/admin.module';

module.directive('ekAdmin', ekAdmin);

ekAdmin.$inject = [];

function ekAdmin() {
    return {
        restrict: 'E',
        scope: true,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-admin')
            .attr('layout', 'column');
    }
}
