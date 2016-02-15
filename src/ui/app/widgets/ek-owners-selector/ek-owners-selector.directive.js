import './ek-owners-selector.less';
import constants from '../constants';
import Controller from './ek-owners-selector.controller';
import template from './ek-owners-selector.html';

class OwnersSelectorDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            shareables: '=',
            selectedOwners: '='
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-owners-selector');

        return ($scope) => _.extend($scope, constants);
    }
}

export default OwnersSelectorDirective;
