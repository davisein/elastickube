import './ek-button-group.less';
import template from './ek-button-group.html';

class ButtonGroupDirective {
    constructor() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-button-group');
    }
}

export default ButtonGroupDirective;
