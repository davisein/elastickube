import './ek-template-name.less';
import template from './ek-template-name.html';

angular
    .module('app.templates')
    .directive('ekTemplateName', () => ({
        restrict: 'E',
        scope: {
            template: '='
        },
        controllerAs: 'ctrl',
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-template-name');
}
