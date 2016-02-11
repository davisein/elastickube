import './ek-owner-info.less';

import { module } from 'widgets/widgets.module';
import controller from './ek-owner-info.controller';
import template from './ek-owner-info.html';

module.directive('ekOwnerInfo', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        shareable: '='
    },
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement
        .addClass('ek-owner-info')
        .attr('layout', 'row')
        .attr('layout-align', 'start center');
}
