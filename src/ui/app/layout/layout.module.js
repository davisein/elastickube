import { name as widgetsModule } from 'widgets/widgets.module';

const name = 'app.layout';

const module = angular.module(name, [
    widgetsModule
]);

export { name, module };
