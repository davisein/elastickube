import './ek-search-filter.less';
import constants from '../constants';
import controller from './ek-search-filter.controller';
import template from './ek-search-filter.html';

angular
    .module('app.widgets')
    .directive('ekSearchFilter', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            collectionToBeFiltered: '=',
            filteredCollection: '=',
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
