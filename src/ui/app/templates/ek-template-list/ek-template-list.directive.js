import './ek-template-list.less';
import controller from './ek-template-list.controller';
import template from './ek-template-list.html';

angular
    .module('app.templates')
    .directive('ekTemplateList', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            templates: '=?'
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-template-list');
}
