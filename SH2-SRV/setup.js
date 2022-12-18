
//-------------------------- SSH

// SSH PUTTY KE  ubuntu@108.136.183.85
// ssh -i "/home/ubuntu/MONGODB_CLUSTER/SSH/EC2_MONGODB_JKT.pem" ubuntu@10.0.1.119 -p 22

//-------------------------- SSH

// run generate_key_fIle.sh
// mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf generate_key_fIle.sh && nano generate_key_fIle.sh
// chmod u+x generate_key_fIle.sh && ./generate_key_fIle.sh

// run docker-compose.yaml
// sudo -i
// mkdir -p /home/ubuntu/MONGODB_CLUSTER && cd /home/ubuntu/MONGODB_CLUSTER && rm -rf docker-compose.yaml && nano docker-compose.yaml
// cd /home/ubuntu/MONGODB_CLUSTER && docker compose down && docker compose -f docker-compose.yaml up -d && docker container ls


// docker container exec -it db-2nd-sh1 /bin/sh
// mongosh --host localhost --port 5001


rs.initiate(
    {
        _id: "db-2nd-repset",
        members: [
            { 
                _id: 0, 
                host: "10.0.1.119:5001"
            },
            { 
                _id: 1, 
                host: "10.0.1.119:5002"
            },
            { 
                _id: 2, 
                host: "10.0.1.119:5003"
            }
        ]
    }
)

rs.status()

// ----------------------- AFTER FINISH (ALL) CONFIG & CONFIG MONGO CLIENT

// SSH PUTTY KE  ubuntu@108.136.183.85
// ssh -i "/home/ubuntu/MONGODB_CLUSTER/SSH/EC2_MONGODB_JKT.pem" ubuntu@10.0.1.119 -p 22
// docker container exec -it db-2nd-sh1 /bin/sh
// mongosh --host localhost --port 5001
// use admin
db.createUser(
    {
        user: "UNDEFINED-USER-2ND",
        pwd: "UNDEFINED*1234",
        roles: [
            { role: "root", db: "admin" },
            { role: "userAdminAnyDatabase", db: "admin" },
            { role: "dbAdminAnyDatabase", db: "admin" },
            { role: "readWriteAnyDatabase", db: "admin" },
            { role: "clusterAdmin", db: "admin" },
            "root",
            "userAdminAnyDatabase",
            "dbAdminAnyDatabase",
            "readWriteAnyDatabase",
            "userAdminAnyDatabase",
            "clusterAdmin",
        ]
    }
)
db.auth("UNDEFINED-USER-2ND", "UNDEFINED*1234")   // WAJIB AUTH
// use belajar
db.orders.find()
// ----------------------- /AFTER FINISH (ALL) CONFIG & CONFIG MONGO CLIENT


