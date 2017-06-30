const {db, Ticket, User} = require ('../../database/');
const util = require('../../helpers/util');

module.exports = server => {
  const io = require('socket.io')(server, { cookie: true });
  const students = {};
  const mentors = {};
  const admins = {};

  io.on('connection', socket => {
    let id = socket.handshake.query.id;
    let role = socket.handshake.query.role;

    if (role === 'student') {
      !students[id] ? students[id] = [socket] : students[id].push(socket);
    } else if (role === 'mentor') {
      !mentors[id] ? mentors[id] = [socket] : mentors[id].push(socket);
    } else if (role === 'admin') {
      !admins[id] ? admins[id] = [socket] : admins[id].push(socket);
    }

    socket.join(id);

    console.log(`${Object.keys(students).length} students connected`);
    console.log(`${Object.keys(mentors).length} mentors connected`);

    socket.on('refresh', () => io.emit('update or submit ticket'));

    socket.on('get wait time', () => {
      let totalAveWait = 0;
      let currAveGap = 0;
      Ticket.findAll({
        where: {
          status: 'Closed',
          claimedAt: {
            $not: null,
          }
        }
      }).then(tickets => {
        totalAveWait = util.computeAvgWaitTime(tickets);
        console.log('totalAveWait: ', totalAveWait);
        return Ticket.findAll({
          where: {
            status: 'Opened',
            createdAt: {
              $gte: new Date(new Date() - 24 * 3600 * 1000).toISOString()
            }
          },
          order: [['createdAt', 'ASC']]
        });
      }).then(result => {
        console.log(result.map(el => el.createdAt));
        currAveGap = util.computeAveTicketOpeningTime(result);
        console.log('gap: ', currAveGap / 3600000);
        result.forEach((ticket, index) =>{
          let obj = {
            waitTime: util.computeCurrWaitTime(totalAveWait, currAveGap, index)
          };
          io.to(ticket.userId).emit('student wait time', obj);
        });
      });
    });

    socket.on('disconnect', socket => {
      if (role === 'student') {
        students[id].length <= 1 ? delete students[id] : students[id].splice(students[id].indexOf(socket), 1);
      } else if (role === 'mentor') {
        mentors[id].length <= 1 ? delete mentors[id] : mentors[id].splice(mentors[id].indexOf(socket), 1);
      } else if (role === 'admin') {
        admins[id].length <= 1 ? delete admins[id] : admins[id].splice(admins[id].indexOf(socket), 1);
      }
      console.log(`Disconnected, now ${Object.keys(students).length} students connected`);
      console.log(`Disconnected, now ${Object.keys(mentors).length} mentors connected`);
    });
  });
};
