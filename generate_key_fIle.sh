#!/bin/bash -ex

# DESCRIPTION : GENERATE KEY FILE MONGODB CLUSTER
# MAINTENER : EKI INDRADI
# OS : UBUNTU 20.04 LTS
# TESTED : 2022-08-21
# GITHUB : https://github.com/EKI-INDRADI
# SERVICE : AWS EC2, AWS LIGHTSAIL, VPS SERVER
#
#
# mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf generate_key_fIle.sh && nano generate_key_fIle.sh
# chmod u+x generate_key_fIle.sh && ./generate_key_fIle.sh

# ----------------------------------


function MongodbPrepareStage {
USER_DEPLOY="ubuntu"
FOLDER_NAME="MONGODB_CLUSTER"
MONGODB_KEY_FILE="KEYUNDEFINED20221218"
}

function MongodbConfigureStage {

sudo -i << EOF
mkdir -p /home/${USER_DEPLOY}/${FOLDER_NAME}/key && \
cd /home/${USER_DEPLOY}/${FOLDER_NAME}/key && \
echo "${MONGODB_KEY_FILE}"> keyFile && \
chmod 400 keyFile && \
chown 999:999 keyFile && \
echo "=============================================== keyFile : ===============================================" && \
cat /home/${USER_DEPLOY}/${FOLDER_NAME}/key/keyFile  && \
echo "=============================================== /keyFile : ==============================================="
EOF

}

MongodbPrepareStage && MongodbConfigureStage