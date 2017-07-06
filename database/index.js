const Sequelize = require('sequelize');
require('dotenv').config();

let db = null; 

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize('postgres:///helpReactor');
}

const Ticket = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  status: Sequelize.STRING,
  location: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  claimedAt: Sequelize.DATE,
  closedAt: Sequelize.DATE
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  role: { type: Sequelize.ENUM('student', 'mentor', 'admin'), allowNull: false },
  cohort: Sequelize.STRING,
  rating: {type: Sequelize.INTEGER, allowNull: true}
});

const Feedback = db.define('feedback', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  rating: Sequelize.INTEGER,
  feedback: Sequelize.TEXT
});

User.hasMany(Ticket);

User.hasMany(Feedback);

Ticket.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId'
});

Ticket.belongsTo(User, {
  as: 'userClaimed',
  foreignKey: 'claimedBy'
});

Feedback.belongsTo(User, {
  as: 'student',
  foreignKey: 'userId'
});

Feedback.belongsTo(User, {
  as: 'mentor',
  foreignKey: 'claimedBy'
});

module.exports = {
  db: db,
  Ticket: Ticket,
  User: User,
  Feedback: Feedback
};
