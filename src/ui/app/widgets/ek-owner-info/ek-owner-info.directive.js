import './ek-owner-info.less';
import Controller from './ek-owner-info.controller';
import template from './ek-owner-info.html';

class OwnerInfoDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            shareable: '='
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-owner-info')
            .attr('layout', 'row')
            .attr('layout-align', 'start center');
    }
}

export default OwnerInfoDirective;
