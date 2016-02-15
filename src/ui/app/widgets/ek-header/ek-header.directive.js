import './ek-header.less';
import constants from '../constants';
import Controller from './ek-header.controller';
import template from './ek-header.html';

class HeaderDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = true;
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-header')
            .attr('layout', 'row')
            .attr('layout-align', 'start');

        return ($scope) => _.extend($scope, constants);
    }
}

export default HeaderDirective;
