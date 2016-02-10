const instances = [
    { owner: 'manuel' },
    { owner: 'paulino' },
    { owner: 'alberto' },
    { owner: 'arnaud' },
    { owner: 'jose' }
];

const workspaces = [
    { id: 'manuel' },
    { id: 'paulino' },
    { id: 'alberto' },
    { id: 'arnaud' },
    { id: 'jose' }
];

export { instances, workspaces };

// const instances = [{
//    status: { observedGeneration: 1, replicas: 1 },
//    spec: {
//        selector: { name: 'eb-gb71p' },
//        template: {
//            spec: {
//                terminationGracePeriodSeconds: 30,
//                restartPolicy: 'Always',
//                dnsPolicy: 'ClusterFirst',
//                containers: [{
//                    terminationMessagePath: '/dev/termination-log',
//                    name: 'eb-gb71p',
//                    image: 'elasticbox/ubuntu',
//                    env: [{
//                        name: 'ELASTICBOX_TOKEN',
//                        value: 'ec05444a-ddd1-4f4c-b6ad-40883d629b33'
//                    }, { name: 'ELASTICBOX_URL', value: 'arnaud.external.elasticbox.com' }, {
//                        name: 'INSTANCE_ID',
//                        value: 'i-80ihuo'
//                    }, { name: 'TOKEN', value: '9e9e32c9-3102-4b3c-9d5d-66852e426838' }],
//                    imagePullPolicy: 'IfNotPresent',
//                    resources: {
//                        requests: { cpu: '0', memory: '0' }, limits: { cpu: '0', memory: '0' }
//                    }
//                }]
//            }, metadata: { labels: { name: 'eb-gb71p' }, creationTimestamp: null }
//        },
//        replicas: 1
//    },
//    metadata: {
//        name: 'eb-gb71',
//        generation: 1,
//        labels: { name: 'eb-gb71p' },
//        namespace: 'default',
//        resourceVersion: '5314',
//        creationTimestamp: '2016-02-09T17:58:02Z',
//        selfLink: '/api/v1/namespaces/default/replicationcontrollers/eb-gb71',
//        uid: 'a9eec898-cf56-11e5-a567-0800277c8839'
//    }
// }];
