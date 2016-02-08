import './ek-avatar.less';
import DEFAULT_IMAGE from 'images/user-nophoto-lg.png';

import { module } from 'widgets/widgets.module';

module.directive('ekAvatar', ekAvatar);

ekAvatar.$inject = [];

function ekAvatar() {
    return {
        restrict: 'E',

        scope: {
            src: '='
        },

        link
    };

    function link($scope, $element) {
        $element.addClass('ek-avatar');

        $scope.$watch('src', (src) => {
            $element.css('background-image', `url(${src || DEFAULT_IMAGE})`);
        });
    }
}
