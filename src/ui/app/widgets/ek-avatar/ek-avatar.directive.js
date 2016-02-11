import './ek-avatar.less';
import DEFAULT_IMAGE from 'images/user-nophoto.svg';

angular
    .module('app.widgets')
    .directive('ekAvatar', () => ({
        restrict: 'E',
        scope: {
            workspace: '='
        },
        compile
    }));

function compile(tElement) {
    tElement.addClass('ek-avatar');

    return ($scope, $element) => {
        $scope.$watch('workspace', (wks) => {
            $element.css('background-image', `url(${wks && wks.icon || DEFAULT_IMAGE})`);
        });
    };
}
