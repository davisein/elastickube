import './ek-owners-selector.less';
import constants from '../constants';
import controller from './ek-owners-selector.controller';
import template from './ek-owners-selector.html';

angular
    .module('app.widgets')
    .directive('ekOwnersSelector', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            shareables: '=',
            selectedOwners: '='
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
