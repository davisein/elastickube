import './ek-header.less';
import template from './ek-header.html';

import _ from 'lodash';
import constants from 'widgets/widgets.constants';
import EKHeaderController from './ek-header.controller';
import { module } from 'widgets/widgets.module';

module.directive('ekHeader', ekHeader);

ekHeader.$inject = [];

function ekHeader() {
    return {
        restrict: 'E',
        scope: true,
        controllerAs: 'ctrl',
        controller: EKHeaderController,
        compile,
        template
    };

    function compile($element) {
        $element
            .addClass('ek-header')
            .attr('layout', 'row')
            .attr('layout-align', 'start');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
