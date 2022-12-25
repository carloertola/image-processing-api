import express from 'express';
import resize from './resizeRoute'

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('This is an app that allows you to do things to your images: </br>'+
    'Resize your images: <a href="/api/resize">Resize Route</a></br>');
});

routes.use('/resize', resize);

export default routes;