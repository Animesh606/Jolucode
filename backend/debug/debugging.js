const User = require('./models/user');
User.findOne({ email: 'test@example.com' })
    .then(user => console.log(user))
    .catch(err => console.error(err));
