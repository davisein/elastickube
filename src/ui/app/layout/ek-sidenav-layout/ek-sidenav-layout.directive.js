import './ek-sidenav-layout.less';
import { module } from 'layout/layout.module';
import template from './ek-sidenav-layout.html';
import MultiTrascludeServiceName from 'core/services/multi-transclude.service';

module.directive('ekSidenavLayout', ekSidenavLayout);

ekSidenavLayout.$inject = [ MultiTrascludeServiceName ];

function ekSidenavLayout(MultiTrascludeService) {
    return {
        restrict: 'E',
        transclude: true,
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
