const randomStuffs = (categories) => {
  return categories[Math.floor(Math.random() * (categories.length - 1))];
};

module.exports.ticketGenerator = (num, res) => {
  res = res || [];
  if (num === 0) { return res; }
  let category = randomStuffs(['Datastructure', 'React', 'Recursion', 'Angular', 'mySQL', 'Mongo', 'Binarysearch', 'Others']);
  let ticket = {
    category: category,
    description: `Need help with ${category}`,
    status: 'Opened'
  };
  res.push(ticket);
  return ticketGenerator(num - 1, res);
};

module.exports.userGenerator = (num, res) => {
  res = res || [];
  if (num === 0) { return res; }
  let firstName = randomStuffs(['Jacob', 'Jessica', 'Tom', 'Vincent', 'Cindy', 'Sam', 'Michelle', 'Karla', 'David', 'Eric']);
  let lastName = randomStuffs(['Smith', 'Johnson', 'Williams', 'Jones', 'Miller', 'Harris', 'Lee', 'Chen']);
  let user = {
    role: randomStuffs(['student', 'mentor', 'admin']),
    firstName: firstName,
    lastName: lastName,
    username: `${firstName[0].toLowerCase()}_${lastName.toLowerCase()}`
  };
  res.push(user);
  return userGenerator(num - 1, res);
};

module.exports.fakeUsers = [
  {
    role: 'student',
    firstName: 'Eric',
    lastName: 'Mai',
    username: 'enmai1988'
  },
  {
    role: 'mentor',
    firstName: 'David',
    lastName: 'Vassett',
    username: 'dvidvassett'
  },
  {
    role: 'admin',
    firstName: 'Jacob',
    lastName: 'Penney',
    username: 'jacobpenney'
  },
  {
    role: 'student',
    firstName: 'David',
    lastName: 'Gould',
    username: 'davidgould112'
  }
];
