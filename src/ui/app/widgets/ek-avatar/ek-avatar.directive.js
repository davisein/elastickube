import './ek-avatar.less';
import DEFAULT_IMAGE from 'images/user-nophoto.svg';

class AvatarDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            workspace: '='
        };
    }

    compile(tElement) {
        tElement.addClass('ek-avatar');

        return ($scope, $element) => {
            $scope.$watch('workspace', (wks) => {
                $element.css('background-image', `url(${wks && wks.icon || DEFAULT_IMAGE})`);
            });
        };
    }
}

export default AvatarDirective;
