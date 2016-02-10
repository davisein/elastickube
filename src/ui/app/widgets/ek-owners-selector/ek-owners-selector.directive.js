import './ek-owners-selector.less';
import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-owners-selector.controller';
import template from './ek-owners-selector.html';

module.directive('ekOwnersSelector', ekOwnersSelector);

ekOwnersSelector.$inject = [];

function ekOwnersSelector() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            shareables: '=',
            model: '=ngModel'
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-owners-selector');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
