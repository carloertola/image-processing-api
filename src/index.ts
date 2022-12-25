import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Go to the app: <a href="/api">Image API</a>');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server up and running on localhost:${port}`);
});