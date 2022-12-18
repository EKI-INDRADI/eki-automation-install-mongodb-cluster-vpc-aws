
//-------------------------- SSH

// SSH PUTTY KE  ubuntu@108.136.183.85
// ssh -i "/home/ubuntu/MONGODB_CLUSTER/SSH/EC2_MONGODB_JKT.pem" ubuntu@10.0.1.28 -p 22

//-------------------------- SSH

// run generate_key_fIle.sh
// mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf generate_key_fIle.sh && nano generate_key_fIle.sh
// chmod u+x generate_key_fIle.sh && ./generate_key_fIle.sh

// run docker-compose.yaml
// sudo -i
// mkdir -p /home/ubuntu/MONGODB_CLUSTER && cd /home/ubuntu/MONGODB_CLUSTER && rm -rf docker-compose.yaml && nano docker-compose.yaml
// cd /home/ubuntu/MONGODB_CLUSTER && docker compose down && docker compose -f docker-compose.yaml up -d && docker container ls


// docker container exec -it db-1st-sh1 /bin/sh
// mongosh --host localhost --port 5001


rs.initiate(
    {
        _id: "db-1st-repset",
        members: [
            {
                _id: 0,
                host: "10.0.1.28:5001"
            },
            {
                _id: 1,
                host: "10.0.1.28:5002"
            },
            {
                _id: 2,
                host: "10.0.1.28:5003"
            }
        ]
    }
)

rs.status()




// ----------------------- AFTER FINISH (ALL) CONFIG & CONFIG MONGO CLIENT
// docker container exec -it db-1st-sh1 /bin/sh
// mongosh --host localhost --port 5001
// use admin
db.createUser(
    {
        user: "UNDEFINED-USER-1ST",
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
db.auth("UNDEFINED-USER-1ST", "UNDEFINED*1234")   // WAJIB AUTH
// use belajar
db.orders.find()



// --- FOR DELETE
// use admin
// db.auth("UNDEFINED-USER-SH1", "UNDEFINED*1234")  // login with old admin
// 1. create new user admin 
// 2. login new user admin :
// db.auth("UNDEFINED-USER-1ST", "UNDEFINED*1234")  
// 3. delete user : 
// db.dropUser("UNDEFINED-USER-SH1", {w: "majority", wtimeout: 5000})
// --- FOR DELETE

// ----------------------- /AFTER FINISH (ALL) CONFIG & CONFIG MONGO CLIENT


