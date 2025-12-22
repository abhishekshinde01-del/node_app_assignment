const app = require('./src/app');
const sequelize = require('./src/config/db');

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(23570, () => {
    console.log(`Server running at http://mysql-6a5fb7-node-assignment-db.k.aivencloud.com:${23570}`);
  });
});
