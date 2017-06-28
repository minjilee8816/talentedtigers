module.exports = server => {
  const io = require('socket.io')(server, { cookie: true });

  let students = {};
  let mentors = {};

  io.sockets.on('connection', socket => {
    socket.on('userInfo', data => {
      let cookie = socket.request.headers;
      console.log(cookie);
    });
    console.log(`there are ${students.length} students and ${mentors.length} mentors connected`);

    // socket.on('disconnect', () => {
    //   if (userRole === 'student') {
    //     delete students[userId];
    //   } else if (userRole === 'mentor') {
    //     delete mentors[userId];
    //   }
    //   console.log(`Disconnected, there are ${students.length} students and ${mentors.length} mentors connected`);
    // });
  });
};
