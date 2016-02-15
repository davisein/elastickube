import './ek-login.less';
import template from './ek-login.html';

class LoginDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-login')
            .attr('layout', 'column');
    }
}

export default LoginDirective;
