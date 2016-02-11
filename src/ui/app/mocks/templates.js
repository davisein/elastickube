import ANSIBLE from './images/ansible.png';
import ELASTICSEARCH from './images/elasticsearch.png';
import NGINX from './images/nginx.png';
import MONGODB from './images/mongodb.png';
import JENKINS from './images/jenkins.png';
import REDIS from './images/redis.png';

const templates = [
    {
        name: 'Ansible',
        type: 'services',
        icon: ANSIBLE,
        owner: 'diego',
        description: 'Automation platform for apps and IT infrastructure'
    }, {
        name: 'Elasticsearch',
        type: 'resource list',
        icon: ELASTICSEARCH,
        owner: 'alberto',
        description: 'Open Source, Distributed, RESTful Search Engine'
    }, {
        name: 'Nginx',
        type: 'services',
        icon: NGINX,
        owner: 'matt',
        description: 'A free, open-source, high-performance HTTP server'
    }, {
        name: 'MongoDB',
        type: 'persistent volumes',
        icon: MONGODB,
        owner: 'manuel',
        description: 'Open-Source document oriented NoSQL database'
    }, {
        name: 'Jenkins',
        type: 'resource list',
        icon: JENKINS,
        owner: 'paulino',
        description: 'Open-Source continuous integration server'
    }, {
        name: 'Redis',
        type: 'resource list',
        icon: REDIS,
        owner: 'alberto',
        description: 'Build software better, together'
    }
];

export default templates;
