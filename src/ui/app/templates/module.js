import coreModule from 'core/module';
import layoutModule from 'layout/module';
import widgetsModule from 'widgets/module';

//import './routes';

//import './ek-template-card/ek-template-card.directive';
//import './ek-template-filters/ek-template-filters.directive';
//import './ek-template-grid/ek-template-grid.directive';
//import './ek-template-list/ek-template-list.directive';
//import './ek-template-name/ek-template-name.directive';
//import './ek-template-type-selector/ek-template-type-selector.directive';
//import './ek-templates/ek-templates.directive';
//import './ek-templates-sorter/ek-templates-sorter.directive';

const moduleName = 'app.templates';

angular
    .module(moduleName, [
        coreModule,
        layoutModule,
        widgetsModule
    ]);

export default moduleName;
