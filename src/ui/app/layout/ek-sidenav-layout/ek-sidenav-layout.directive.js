import './ek-sidenav-layout.less';

import { module } from 'layout/layout.module';
import template from './ek-sidenav-layout.html';
import MultiTrascludeServiceName from 'core/services/multi-transclude.service';

module.directive('ekSidenavLayout', [MultiTrascludeServiceName, (MultiTrascludeService) => {
    return {
        restrict: 'E',
        transclude: true,
        compile,
        template
    };

    function compile(tElement) {
        tElement.addClass('ek-sidenav-layout');

        return ($scope, $element, $attrs, controller, $transcludeFn) => {
            MultiTrascludeService.transclude($element, $transcludeFn);
        };
    }
}]);
