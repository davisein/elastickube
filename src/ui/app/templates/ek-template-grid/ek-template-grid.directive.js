import './ek-template-grid.less';
import template from './ek-template-grid.html';

angular
    .module('app.templates')
    .directive('ekTemplateGrid', () => ({
        restrict: 'E',
        scope: {
            templates: '=?'
        },
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-template-grid');
}
