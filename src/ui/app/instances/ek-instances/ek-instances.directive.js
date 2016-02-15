import './ek-instances.less';
import constants from '../constants';
import Controller from './ek-instances.controller';
import template from './ek-instances.html';

class InstancesDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-instances')
            .attr('layout', 'column');

        return ($scope) => _.extend($scope, constants);
    }
}

export default InstancesDirective;
