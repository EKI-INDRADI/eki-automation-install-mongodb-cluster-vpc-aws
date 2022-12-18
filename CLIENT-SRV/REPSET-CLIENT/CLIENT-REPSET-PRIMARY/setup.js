
//-------------------------- SSH
// SSH PUTTY KE  ubuntu@108.136.183.85
//-------------------------- SSH

// run generate_key_fIle.sh
// mkdir -p /home/ubuntu && cd /home/ubuntu && rm -rf generate_key_fIle.sh && nano generate_key_fIle.sh
// chmod u+x generate_key_fIle.sh && ./generate_key_fIle.sh

// run docker-compose.yaml
// sudo -i
// mkdir -p /home/ubuntu/MONGODB_CLUSTER && cd /home/ubuntu/MONGODB_CLUSTER && rm -rf docker-compose.yaml && nano docker-compose.yaml
// cd /home/ubuntu/MONGODB_CLUSTER && docker compose down && docker compose -f docker-compose.yaml up -d && docker container ls


// docker container exec -it db-client /bin/sh
// mongosh --host localhost --port 7000 

// use admin

// ----------------------- FIRST ONLY
db.createUser(
    {
      user: "UNDEFINED-USER",
      pwd: "UNDEFINED*1234",
      roles: [ 
               { role: "root", db: "admin" } ,
               { role: "userAdminAnyDatabase", db: "admin" }, 
               { role: "dbAdminAnyDatabase", db: "admin" }, 
               { role: "readWriteAnyDatabase", db: "admin" },
               { role: "clusterAdmin", db : "admin"},
               "root",
               "userAdminAnyDatabase",
               "dbAdminAnyDatabase",
               "readWriteAnyDatabase",
               "userAdminAnyDatabase",
               "clusterAdmin",
             ]
    }
  )
// ----------------------- FIRST ONLY
// use admin
db.auth("UNDEFINED-USER", "UNDEFINED*1234")   // WAJIB AUTH
sh.status()



//========================= AFTER SETUP SHARD 1, SHARD 2, SHARD 3
sh.addShard("db-1st-repset/10.0.1.28:5001,10.0.1.28:5002,10.0.1.28:5003") 
sh.status()

sh.addShard("db-2nd-repset/10.0.1.119:5001,10.0.1.119:5002,10.0.1.119:5003")
sh.status()


//------------------ JIKA INGIN MENAMBAHKAN SHARD LAGI
// sh.addShard("db-3rd-repset/10.0.1.108:5001,10.0.1.108:5002,10.0.1.108:5003")
// sh.status()
//------------------ /JIKA INGIN MENAMBAHKAN SHARD LAGI

sh.enableSharding("belajar") 
sh.status()

sh.shardCollection("belajar.orders", { "userId": "hashed" }) // company_id
sh.status()

// masuk login ke shard yang udah di bikin admin  user di client (kalo tanpa admin user disetup di client bisa)
// penentuan masukny chunk hash
// query spefic by chunk
// 1. bikin replicaset (tanpa arbiter) dari mongo client sharding
// monitoring server

db.adminCommand( { flushRouterConfig: "test.myShardedCollection" } );
db.getSiblingDB("orders").myShardedCollection.getShardDistribution();

//========================= /AFTER SETUP SHARD 1, SHARD 2, SHARD 3




// FINISH
// mongodb://UNDEFINED-USER:UNDEFINED*1234@108.136.183.85:7000/?authSource=admin

sh.status()
//------------------------------  AFTER ADD 2 SHARD

[
  {
    database: {
      _id: 'belajar',
      primary: 'db-2nd-repset',
      partitioned: false,
      version: {
        uuid: UUID("c6c37405-8b6e-457b-a2d9-db54c693ffb1"),
        timestamp: Timestamp({ t: 1663234057, i: 32 }),
        lastMod: 1
      }
    },
    collections: {
      'belajar.orders': {
        shardKey: { userId: 'hashed' },
        unique: false,
        balancing: true,
        chunkMetadata: [
          { shard: 'db-1st-repset', nChunks: 2 },
          { shard: 'db-2nd-repset', nChunks: 2 }
        ],
        chunks: [
          { min: { userId: MinKey() }, max: { userId: Long("-4611686018427387902") }, 'on shard': 'db-1st-repset', 'last modified': Timestamp({ t: 1, i: 0 }) },
          { min: { userId: Long("-4611686018427387902") }, max: { userId: Long("0") }, 'on shard': 'db-1st-repset', 'last modified': Timestamp({ t: 1, i: 1 }) },
          { min: { userId: Long("0") }, max: { userId: Long("4611686018427387902") }, 'on shard': 'db-2nd-repset', 'last modified': Timestamp({ t: 1, i: 2 }) },
          { min: { userId: Long("4611686018427387902") }, max: { userId: MaxKey() }, 'on shard': 'db-2nd-repset', 'last modified': Timestamp({ t: 1, i: 3 }) }
        ],
        tags: []
      }
    }
  },
  {
    database: { _id: 'config', primary: 'config', partitioned: true },
    collections: {
      'config.system.sessions': {
        shardKey: { _id: 1 },
        unique: false,
        balancing: true,
        chunkMetadata: [
          { shard: 'db-1st-repset', nChunks: 908 },
          { shard: 'db-2nd-repset', nChunks: 116 }
        ],
        chunks: [
          'too many chunks to print, use verbose if you want to force print'
        ],
        tags: []
      }
    }
  }
]
//------------------------------  /AFTER ADD 2 SHARD





