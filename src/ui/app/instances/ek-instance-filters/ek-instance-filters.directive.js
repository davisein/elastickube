import './ek-instance-filters.less';
import Controller from './ek-instance-filters.controller';
import template from './ek-instance-filters.html';

class InstanceFiltersDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {};
        this.bindToController = {
            instancesToFilter: '=',
            filteredInstances: '='
        };
        this.controllerAs = 'ctrl';
        this.controller = Controller;
        this.template = template;
    }

    compile(tElement) {
        tElement
            .addClass('ek-instance-filters')
            .attr('layout', 'column');
    }
}

export default InstanceFiltersDirective;
