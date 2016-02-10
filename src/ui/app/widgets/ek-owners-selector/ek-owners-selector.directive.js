import './ek-owners-selector.less';

import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-owners-selector.controller';
import template from './ek-owners-selector.html';

module.directive('ekOwnersSelector', () => ({
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
}));

function compile(tElement) {
    tElement.addClass('ek-owners-selector');

    return ($scope) => _.extend($scope, constants);
}
