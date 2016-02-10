import WORDPRESS_ICON from './icons-mocks/docker.png';
import HAPROXY_ICON from './icons-mocks/services.png';
import KIBANA_ICON from './icons-mocks/kibana.png';
import MY_SQL_ICON from './icons-mocks/mysql.png';
import NODEJS_ICON from './icons-mocks/nodejs.png';
import NGINX_ICON from './icons-mocks/nginx.png';

const instances = [{
    name: 'blog-prod-us-a',
    state: 'online',
    serviceId: 'ek-106hk',
    labels: ['blog', 'prod', 'usa'],
    owner: 'Matt Nickles',
    updated: new Date('2-1-2016'),
    icon: WORDPRESS_ICON
}, {
    name: 'kibana-prod',
    state: 'shutdown',
    serviceId: 'ek-dv66d',
    labels: ['kibana', 'prod'],
    owner: 'Alberto Arias Maestro',
    updated: new Date('2-3-2016'),
    icon: KIBANA_ICON
}, {
    name: 'mysql-prod-us-a',
    state: 'online',
    serviceId: 'ek-a323f',
    labels: ['database', 'prod', 'mysql'],
    owner: 'Alberto Arias Maestro',
    updated: new Date(),
    icon: MY_SQL_ICON
}, {
    name: 'multi-bastion-prod-us-a',
    state: 'online',
    serviceId: 'ek-li2a9',
    labels: ['bastion'],
    owner: 'Alberto Arias Maestro',
    updated: new Date(),
    icon: NGINX_ICON
}, {
    name: 'services-prod-us-a',
    state: 'online',
    serviceId: 'ek-gr43d',
    labels: ['services', 'prod'],
    owner: 'Alberto Arias Maestro',
    updated: new Date('2-5-2016'),
    icon: NODEJS_ICON
}, {
    name: 'website-prod-us-a',
    state: 'online',
    serviceId: 'ek-ot32e',
    labels: ['website'],
    owner: 'Diego Sanjuan Martinez',
    updated: new Date(),
    icon: HAPROXY_ICON
}];

export default _.map(instances, (x, i) => {
    x.id = `${x.id}-${i}`;

    return x;
});
