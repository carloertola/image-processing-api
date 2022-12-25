import express from 'express';
import resize from './resize'

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send("I'm the main router");
});

routes.use('/resize', resize);

export default routes;