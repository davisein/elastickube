import './ek-avatar.less';
import template from './ek-avatar.html';
import DEFAULT_IMAGE from 'images/user-nophoto-lg.png';

import { module } from 'widgets/widgets.module';

module
    .directive('ekAvatar', Avatar);

Avatar.$inject = [];

function Avatar() {
    return {
        restrict: 'E',
        replace: true,

        scope: {
            src: '='
        },

        link,
        template
    };

    function link($scope, $element) {
        $element.addClass('ek-avatar');

        $scope.$watch('src', (src) => $scope.imageSrc = src || DEFAULT_IMAGE);
    }
}
