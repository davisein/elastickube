import './ek-search-filter.less';
import constants from '../constants';
import Controller from './ek-search-filter.controller';
import template from './ek-search-filter.html';

class SearchFilterDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            collectionToBeFiltered: '=',
            filteredCollection: '=',
            searchField: '@'
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-search-filter');

        return ($scope) => _.extend($scope, constants);
    }
}

export default SearchFilterDirective;
