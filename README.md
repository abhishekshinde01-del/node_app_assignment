// npm install sequelize pg pg-hstore dotenv
# GET all users
curl http://localhost:3000/employe

# GET user by ID
curl http://localhost:3000/employe/1

# POST create user
curl -X POST http://localhost:3000/employe \
-H "Content-Type: application/json" \
-d '{"name":"Abhishek","email":"abhishek@gmail.com"}'

# PUT update user
curl -X PUT http://localhost:3000/employe/1 \
-H "Content-Type: application/json" \
-d '{"name":"Abhishek Updated"}'

# DELETE user
curl -X DELETE http://localhost:3000/employe/1


# Project steps

Step 1 - Run apllication using this command -> node ./src/server.js
Step 2 - Run this command on chrome so you will get the swagger - http://mysql-6a5fb7-node-assignment-db.k.aivencloud.com:23574/api-docs/




