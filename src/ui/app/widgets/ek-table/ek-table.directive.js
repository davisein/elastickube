import './ek-table.less';
import constants from '../constants';
import Controller from './ek-table.controller';
import template from './ek-table.html';

class TableDirective {
    constructor() {
        this.restrict = 'E';
        this.transclude = true;
        this.scope = {};
        this.bindToController = {
            headers: '=',
            initialSelection: '=',
            initialOrder: '@'
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-table');

        return ($scope, iElement, iAttrs, $controller) => {
            _.extend($scope, constants);

            $controller.currentSelection = $controller.initialSelection;
            $controller.sortOrder = $controller.initialOrder;
        };
    }
}

export default TableDirective;
