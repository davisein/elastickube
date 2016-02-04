import './ek-header.less';
import template from './ek-header.html';

import HeaderController from './ek-header.controller';
import { module } from 'layout/layout.module';

module
    .directive('ekHeader', Header);

Header.$inject = [];

function Header() {
    return {
        restrict: 'E',
        controllerAs: 'ctrl',
        controller: HeaderController,
        compile,
        template
    };
}

function compile($element) {
    $element.addClass('ek-header');
}
