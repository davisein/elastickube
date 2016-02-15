import './ek-instance-name.less';
import template from './ek-instance-name.html';

class InstanceNameDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            instance: '='
        };
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-instance-name');
    }
}

export default InstanceNameDirective;
