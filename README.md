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
