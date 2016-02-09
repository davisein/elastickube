import './ek-search-filter.less';
import { module } from 'widgets/widgets.module';
import constants from 'widgets/widgets.constants';
import controller from './ek-search-filter.controller';
import template from './ek-search-filter.html';

module.directive('ekSearchFilter', ekSearchFilter);

ekSearchFilter.$inject = [];

function ekSearchFilter() {
    return {
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
    };

    function compile($element) {
        $element.addClass('ek-search-filter');

        return link;
    }

    function link($scope) {
        _.extend($scope, constants);
    }
}
