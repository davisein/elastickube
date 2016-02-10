import { module } from 'core/core.module';
import moment from 'moment';

module.filter('ekHumanizeDate', () => ekHumanizeDate);

function ekHumanizeDate(input) {
    let formattedDuration;

    if (input) {
        const duration = moment.duration(moment.utc().local().diff(moment.utc(input).local()));

        formattedDuration = duration < moment.duration(5, 'minutes') ? 'a moment' : duration.humanize();
    } else {
        formattedDuration = '';
    }

    return formattedDuration;
}
