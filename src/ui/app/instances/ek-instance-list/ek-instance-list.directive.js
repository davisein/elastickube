import './ek-instance-list.less';
import Controller from './ek-instance-list.controller';
import template from './ek-instance-list.html';

class InstanceListDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            instances: '=?'
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-instance-list');

        return ($scope, $element, $attrs, ctrl) => {
            const ekTableCtrl = $element.find('.ek-table').controller('ekTable');

            ekTableCtrl.headerClickListener = ctrl.sortByCallback.bind(ctrl);
        };
    }
}

export default InstanceListDirective;
