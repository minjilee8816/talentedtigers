const Sequelize = require('sequelize');
const db = new Sequelize('helpReactor', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Ticket = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: Sequelize.INTEGER,
  openedAt: Sequelize.DATE,
  claimedAt: Sequelize.DATE,
  closedAt: Sequelize.DATE,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  status: Sequelize.STRING,
  claimedBy: Sequelize.INTEGER
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  username: { type: Sequelize.STRING, notNull: true },
  password: { type: Sequelize.STRING, notNull: true },
  role: { type: Sequelize.ENUM('student', 'mentor', 'admin'), notNull: true }
});

Ticket.belongsTo(User, {
  foreignKey: 'id',
  constraints: false
});

User.hasMany(Ticket, {
  foreignKey: 'userId',
  constraints: false
});

Ticket.sync();
User.sync();

exports = {
  Ticket: Ticket,
  User: User
};
