import './ek-header-layout.less';
import template from './ek-header-layout.html';

import { module } from 'layout/layout.module';
import MultiTrascludeServiceName from 'core/services/multi-transclude.service';

module.directive('ekHeaderLayout', ekHeaderLayout);

ekHeaderLayout.$inject = [ MultiTrascludeServiceName ];

function ekHeaderLayout(MultiTrascludeService) {
    return {
        restrict: 'E',
        transclude: true,

        scope: {
            src: '='
        },

        compile,
        template
    };

    function compile($element) {
        $element
            .attr('layout', 'column')
            .addClass('ek-header-layout');

        return link;
    }

    function link($scope, $element, $attrs, controller, $transcludeFn) {
        MultiTrascludeService.transclude($element, $transcludeFn);
    }
}
