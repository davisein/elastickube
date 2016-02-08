import './ek-sidenav-layout.less';
import template from './ek-sidenav-layout.html';

import { module } from 'layout/layout.module';
import MultiTrascludeServiceName from 'core/services/multi-transclude.service';

module.directive('ekSidenavLayout', ekSidenavLayout);

ekSidenavLayout.$inject = [ MultiTrascludeServiceName ];

function ekSidenavLayout(MultiTrascludeService) {
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
        $element.addClass('ek-sidenav-layout');

        return link;
    }

    function link($scope, $element, $attrs, controller, $transcludeFn) {
        MultiTrascludeService.transclude($element, $transcludeFn);
    }
}
