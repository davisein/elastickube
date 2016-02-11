import './ek-templates-sorter.less';
import controller from './ek-templates-sorter.controller';
import template from './ek-templates-sorter.html';

angular
    .module('app.templates')
    .directive('ekTemplatesSorter', () => ({
        restrict: 'E',
        scope: {},
        bindToController: {
            collectionToSort: '=',
            sortedCollection: '='
        },
        controllerAs: 'ctrl',
        controller,
        compile,
        template
    }));

function compile(tElement) {
    tElement.addClass('ek-templates-sorter');
}
