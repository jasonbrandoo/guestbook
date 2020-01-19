const Express = require('express');
const cors = require('cors');

const app = Express();
const port = 3001;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(Express.json());

app.use('/event', require('./api/event'));

app.listen(process.env.port || port, () => {
  console.log(`Server run on ${port}`);
});
