import 'angular-material/angular-material';

import AvatarDirective from './ek-avatar/ek-avatar.directive';
import ButtonGroupDirective from './ek-button-group/ek-button-group.directive';
import HeaderDirective from './ek-header/ek-header.directive';
import OwnerInfoDirective from './ek-owner-info/ek-owner-info.directive';
import OwnersSelectorDirective from './ek-owners-selector/ek-owners-selector.directive';
import SearchFilterDirective from './ek-search-filter/ek-search-filter.directive';
import TableDirective from './ek-table/ek-table.directive';

const moduleName = 'app.widgets';

angular
    .module(moduleName, [
        'ngMaterial'
    ])
    .directive('ekAvatar', () => new AvatarDirective())
    .directive('ekButtonGroup', () => new ButtonGroupDirective())
    .directive('ekHeader', () => new HeaderDirective())
    .directive('ekOwnerInfo', () => new OwnerInfoDirective())
    .directive('ekOwnersSelector', () => new OwnersSelectorDirective())
    .directive('ekSearchFilter', () => new SearchFilterDirective())
    .directive('ekTable', () => new TableDirective());

export default moduleName;
