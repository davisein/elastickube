import { name as coreModule } from 'core/core.module';
import { name as layoutModule } from 'layout/layout.module';

const name = 'app.templates';

const module = angular
    .module(name, [
        coreModule,
        layoutModule
    ]);

export { name, module };
