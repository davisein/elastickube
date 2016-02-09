import _ from 'lodash';
import { module } from 'core/core.module';

const serviceName = 'multiTranscludeService';

module.service(serviceName, multiTransclude);

multiTransclude.$inject = [];

function multiTransclude() {
    this.transclude = transclude;

    function transclude($element, $transcludeFn) {
        $transcludeFn((clone) => {
            _.chain(clone)
                .filter(x => x.nodeType === 1)
                .each((cloneEl) => {
                    const destinationId = getAttribute(cloneEl, 'transclude-to');
                    const append = getAttribute(cloneEl, 'transclude-append') === 'true';
                    const destination = $element.find(`[transclude-id="${destinationId}"]`);

                    if (destination.length) {
                        if (append) {
                            destination.append(cloneEl);
                        } else {
                            destination.html(cloneEl);
                        }
                    } else {
                        cloneEl.remove();
                    }
                })
                .value();
        });
    }

    function getAttribute(item, attributeName) {
        const attribute = item.attributes[attributeName];

        if (angular.isDefined(attribute)) {
            return attribute.value;
        }
    }
}

export default serviceName;
