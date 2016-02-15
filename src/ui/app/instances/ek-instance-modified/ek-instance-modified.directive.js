import './ek-instance-modified.less';
import Controller from './ek-instance-modified.controller';
import template from './ek-instance-modified.html';

class InstanceModifiedDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            instance: '='
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-instance-modified');
    }
}

export default InstanceModifiedDirective;
