import _ from 'lodash';
import { module } from 'core/core.module';

const name = 'multiTranscludeService';

module.service(name, multiTransclude);

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
        let value;
        const attribute = item.attributes[ attributeName ];

        if (angular.isDefined(attribute)) {
            value = attribute.value;
        }

        return value;
    }
}

export default name;
