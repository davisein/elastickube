import { name as coreModule } from 'core/core.module';

const name = 'app.layout';

const module = angular.module(name, [
    coreModule
]);

export { name, module };
