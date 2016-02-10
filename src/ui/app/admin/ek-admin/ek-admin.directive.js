import './ek-admin.less';

import { module } from 'admin/admin.module';
import template from './ek-admin.html';

module.directive('ekAdmin', () => ({
    restrict: 'E',
    scope: {},
    compile,
    template
}));

function compile(tElement) {
    tElement
        .addClass('ek-admin')
        .attr('layout', 'column');
}
