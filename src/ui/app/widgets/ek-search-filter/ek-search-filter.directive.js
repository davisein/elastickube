import './ek-search-filter.less';

import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-search-filter.controller';
import template from './ek-search-filter.html';

module.directive('ekSearchFilter', () => ({
    restrict: 'E',
    scope: {},
    bindToController: {
        input: '=',
        output: '=',
        searchField: '@'
    },
    controllerAs: 'ctrl',
    controller,
    compile,
    template
}));

function compile(tElement) {
    tElement.addClass('ek-search-filter');

    return ($scope) => _.extend($scope, constants);
}
