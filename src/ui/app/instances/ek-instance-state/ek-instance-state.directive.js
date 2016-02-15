import './ek-instance-state.less';
import template from './ek-instance-state.html';

class InstanceStateDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            instance: '='
        };
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-instance-state');
    }
}

export default InstanceStateDirective;
