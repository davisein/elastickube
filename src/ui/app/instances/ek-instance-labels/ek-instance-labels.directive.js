import './ek-instance-labels.less';
import constants from '../constants';
import template from './ek-instance-labels.html';

class InstanceLabelsDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            instance: '='
        };
        this.template = template;
    }

    compile(tElement) {
        tElement.addClass('ek-instance-labels');

        return ($scope) => _.extend($scope, constants);
    }
}

export default InstanceLabelsDirective;
