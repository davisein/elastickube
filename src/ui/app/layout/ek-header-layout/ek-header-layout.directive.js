import './ek-header-layout.less';
import template from './ek-header-layout.html';

angular
    .module('app.layout')
    .directive('ekHeaderLayout', ['multiTransclude', (multiTransclude) => {
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
                multiTransclude.transclude($element, $transcludeFn);
            };
        }
    }]);
