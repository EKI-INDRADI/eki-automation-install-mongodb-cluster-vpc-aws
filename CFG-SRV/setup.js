
//-------------------------- SSH

// SSH PUTTY KE  ubuntu@108.136.183.85
// ssh -i "/home/ubuntu/MONGODB_CLUSTER/SSH/EC2_MONGODB_JKT.pem" ubuntu@10.0.1.181 -p 22

//-------------------------- SSH

// run generate_key_fIle.sh
// mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf generate_key_fIle.sh && nano generate_key_fIle.sh
// chmod u+x generate_key_fIle.sh && ./generate_key_fIle.sh

// run docker-compose.yaml
// sudo -i
// mkdir -p /home/ubuntu/MONGODB_CLUSTER && cd /home/ubuntu/MONGODB_CLUSTER && rm -rf docker-compose.yaml && nano docker-compose.yaml
// cd /home/ubuntu/MONGODB_CLUSTER && docker compose down && docker compose -f docker-compose.yaml up -d && docker container ls


// docker container exec -it db-cfg1 /bin/sh
// mongosh --host localhost --port 6001


rs.initiate(
    {
        _id: "db-cfg-repset",
        configsvr: true,
        members: [
            {
                _id: 0,
                host: "10.0.1.181:6001"
            },
            {
                _id: 1,
                host: "10.0.1.181:6002",
            },
            {
                _id: 2,
                host: "10.0.1.181:6003"
            }
        ]
    }
)

rs.status()


