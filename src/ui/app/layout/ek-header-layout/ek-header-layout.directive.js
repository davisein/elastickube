import './ek-header-layout.less';

import { module } from 'layout/layout.module';
import template from './ek-header-layout.html';
import MultiTrascludeServiceName from 'core/services/multi-transclude.service';

module.directive('ekHeaderLayout', [MultiTrascludeServiceName, (MultiTrascludeService) => {
    return {
        restrict: 'E',
        transclude: true,
        compile,
        template
    };

    function compile(tElement) {
        tElement.addClass('ek-header-layout');

        return ($scope, $element, $attrs, controller, $transcludeFn) => {
            $scope.title = $attrs.title;
            MultiTrascludeService.transclude($element, $transcludeFn);
        };
    }
}]);
