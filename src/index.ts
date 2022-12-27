import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);
app.set('view engine', 'pug');

// redirecting localhost:3000 to localhost:3000/api
app.get('/', (req, res) => {
  res.redirect('/api');
});

app.listen(port, () => {
  console.log(`Server up and running on localhost:${port}`);
});

export default app;
