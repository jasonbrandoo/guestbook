const Express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = Express();
const port = 3001;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(Express.json());
app.use(cookieParser());

app.get('/tes', (req, res) => {
  res.status(200);
  res.cookie('tes', 1, { httpOnly: true });
  res.end();
});

app.use('/event', require('./api/event'));
app.use('/user', require('./api/user'));

app.listen(process.env.port || port, () => {
  console.log(`Server run on ${port}`);
});
