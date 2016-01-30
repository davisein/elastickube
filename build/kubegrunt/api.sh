#!/bin/bash

KUBECTL="/opt/kubernetes/$(ls /opt/kubernetes | head -n 1)/bin/kubectl"

# Rebuild image
docker build --file=../../src/api/Dockerfile --tag=elasticbox/elastickube ../../src/api

# Ensure service is created
if [[ -z $(${KUBECTL} get svc --namespace=kube-system | grep elastickube-api) ]]
then
    ${KUBECTL} create -f api_svc.yaml
fi

# Stop replication controller if running
if [[ -n $(${KUBECTL} get rc --namespace=kube-system | grep elastickube-api) ]]
then
    ${KUBECTL} delete rc elastickube-api --namespace=kube-system
fi

# Recreate replication controller
${KUBECTL} create -f api_rc.yaml

