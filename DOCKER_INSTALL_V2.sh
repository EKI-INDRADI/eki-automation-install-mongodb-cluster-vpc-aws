#!/bin/bash -ex

# DESCRIPTION : AUTO INSTALL DOCKER
# MAINTENER : EKI INDRADI
# OS : UBUNTU 20.04 LTS
# TESTED : 2022-08-21
# GITHUB : https://github.com/EKI-INDRADI
# SERVICE : AWS EC2, AWS LIGHTSAIL, VPS SERVER
#
#
# mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf DOCKER_INSTALL_V2.sh && nano DOCKER_INSTALL_V2.sh
# chmod u+x DOCKER_INSTALL_V2.sh && ./DOCKER_INSTALL_V2.sh




function dockerPrepareStage {

sudo -i << EOF
rm -rf /etc/apt/keyrings/docker.gpg && \
rm -rf /etc/apt/sources.list.d/docker.list && \
apt-get update
EOF


{ # try
sudo -i << EOF
apt-get remove docker docker-engine docker.io containerd runc docker-compose-plugin  docker-ce-cli
EOF
} || { # catch
echo "=== SKIP ERROR MISSING docker docker-engine docker.io containerd runc ==="
}

}

function dockerConfigureStage {


sudo -i << EOF
sleep 1 && \
apt-get update && \
apt-get install \
    ca-certificates -y \
    curl -y \
    gnupg -y \
    lsb-release -y && \
mkdir -p /etc/apt/keyrings && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null  && \
apt-get update && \
apt-cache madison docker-ce 
EOF

}

function dockerInstallStage {

sudo -i << EOF
sleep 1 && \
apt-get install docker-ce=5:20.10.21~3-0~ubuntu-focal -y  && \
apt-get install docker-ce-cli=5:20.10.21~3-0~ubuntu-focal -y  && \
apt-get install containerd.io -y  && \
apt-get install docker-compose-plugin -y  && \
docker --version
EOF

}


function dockerSetup {

dockerPrepareStage && dockerConfigureStage && dockerInstallStage


}


function dockerComposeSetup {
    
sudo -i << EOF
sleep 1 && \
apt-get update && \
apt-get install docker-compose-plugin -y && \
apt-cache madison docker-compose-plugin
EOF


sudo -i << EOF
sleep 1 && \
apt-get install docker-compose-plugin=2.12.2~ubuntu-focal && \
docker compose version
EOF

}


dockerSetup && dockerComposeSetup



