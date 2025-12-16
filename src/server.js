const app = require('./app');
const sequelize = require('./config/db');

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
