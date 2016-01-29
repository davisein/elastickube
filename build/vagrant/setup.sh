#!/bin/bash

set -e

mkdir -p /opt/elastickube/dev
chown -R elasticbox:elasticbox /opt/elastickube/dev
ln -snf /opt/elastickube/dev /opt/elastickube/current

mkdir -p /home/elasticbox/.ssh
pushd /home/elasticbox
    chown -R elasticbox:elasticbox .ssh
    chmod -R 700 .ssh
    chmod 600 .ssh/*
popd

sudo mkdir -p /root/.ssh
sudo chown -R root:root /root/.ssh
sudo chmod -R 700 /root/.ssh
sudo chmod 600 /root/.ssh/*

# Start Rsync daemon and enable it at boot
sudo sed -i 's/^RSYNC_ENABLE=false/RSYNC_ENABLE=true/' /etc/default/rsync
sudo /etc/init.d/rsync start

# Set LC_ALL locale
if [[ "$(grep -c "^LC_ALL=" /etc/environment)" -eq "0" ]]; then
    echo 'LC_ALL="en_US.UTF-8"' | sudo tee -a /etc/environment > /dev/null
fi
