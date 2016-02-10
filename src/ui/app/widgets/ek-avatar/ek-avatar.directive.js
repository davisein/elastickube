import './ek-avatar.less';
import { module } from 'widgets/widgets.module';
import DEFAULT_IMAGE from 'images/user-nophoto-lg.png';

module.directive('ekAvatar', ekAvatar);

function ekAvatar() {
    return {
        restrict: 'E',
        scope: {
            workspace: '='
        },
        compile,
        link
    };

    function compile($element) {
        $element.addClass('ek-avatar');

        return link;
    }

    function link($scope, $element) {
        $scope.$watch('workspace', (wks) => {
            $element.css('background-image', `url(${wks && wks.icon || DEFAULT_IMAGE})`);
        });
    }
}
