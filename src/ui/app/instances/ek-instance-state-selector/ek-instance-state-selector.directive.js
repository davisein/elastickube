import './ek-instance-state-selector.less';
import Controller from './ek-instance-state-selector.controller';
import template from './ek-instance-state-selector.html';

class InstanceStateSelectorDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            instances: '=',
            selectedState: '='
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-instance-state-selector')
            .attr('layout', 'column');
    }
}

export default InstanceStateSelectorDirective;
