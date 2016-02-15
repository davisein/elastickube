import './ek-admin.less';
import template from './ek-admin.html';

class AdminDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-admin')
            .attr('layout', 'column');
    }
}

export default AdminDirective;
