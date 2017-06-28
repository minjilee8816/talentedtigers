const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

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
  claimedBy: Sequelize.INTEGER,
  createdAt: { type: Sequelize.DATE, indexes: true },
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
  role: { type: Sequelize.ENUM('student', 'mentor', 'admin'), allowNull: false }
});

Ticket.belongsTo(User);

User.hasMany(Ticket, {
  foreignKey: 'userId',
  constraints: false
});

const select = (category, status, dateStart) => {
  Ticket.findAll({
    where:
      {
       category: category, 
       status: status,
        createdAt: {
          gt: dateStart
        }
      }
    })
  .then(ticket => {
    return ticket;
  });
};

const selectAll = () => {
  //this function is called when only tickets of a given category want to be viewed
  Ticket.findAll()
  .then(ticket => {
    // Array.isArray(ticket) ? ticket.forEach((ticketEntry) => console.log('this is an indiv ticket ', ticketEntry.dataValues)) : console.log('this is the only ticket!: ', ticket.dataValues);
    return ticket;
  });
};

// db.sync({ force: true });
// User.sync({ force: true });
// Ticket.sync({ force: true });

// User.bulkCreate(fakeData.fakeUsers);
// Ticket.bulkCreate(fakeData.ticketGenerator(20));
// selectAll();
// select('Recursion', 'Opened');
module.exports = {
  db: db,
  Ticket: Ticket,
  User: User,
  select: select
};
