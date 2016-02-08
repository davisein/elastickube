import './ek-search-filter.less';
import template from './ek-search-filter.html';

import _ from 'lodash';
import constants from 'widgets/widgets.constants';
import EKSearchFilterController from './ek-search-filter.controller';
import { module } from 'widgets/widgets.module';

module.directive('ekSearchFilter', ekSearchFilter);

ekSearchFilter.$inject = [];

function ekSearchFilter() {
    return {
        restrict: 'E',

        scope: {
            input: '=',
            output: '=',
            searchField: '@'
        },

        controllerAs: 'ctrl',
        controller: EKSearchFilterController,
        compile,
        template
    };

    function compile($element) {
        $element.addClass('ek-search-filter');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
