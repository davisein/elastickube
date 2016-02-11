import './ek-sidenav-layout.less';
import template from './ek-sidenav-layout.html';

angular
    .module('app.layout')
    .directive('ekSidenavLayout', ['multiTransclude', (multiTransclude) => {
        return {
            restrict: 'E',
            transclude: true,
            compile,
            template
        };

        function compile(tElement) {
            tElement.addClass('ek-sidenav-layout');

            return ($scope, $element, $attrs, controller, $transcludeFn) => {
                multiTransclude.transclude($element, $transcludeFn);
            };
        }
    }]);
