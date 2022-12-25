import express from 'express';
import path from 'path';
import resizer from '../utilities/resizeImage';

const resize = express.Router();

// passing query parameters to function that handles resize if they exist
resize.get('/', async (req, res) => {
    if(req.query.filename && req.query.width && req.query.height) {
        let filename = (req.query.filename) as string,
        width = Number(req.query.width),
        height = Number(req.query.height);

        resizer(filename, width, height);

        const resImg = path.join(__dirname, '..', '..', 'thumb_images', 'resized_' + 
        req.query.width + 'x' + req.query.height + '_' + filename);

        res.sendFile(resImg);
    } else if(req.query.filename) {
        const fullImg = path.join(__dirname, '..', '..', 'full_size_images', req.query.filename as string);
        res.sendFile(fullImg);
    } else {
        res.send('Please enter a query with filename, width, and height like this:</br>' +
        '<code>http://localhost:3000/api/resize?filename=encenadaport.jpg&width=200&height=200</code>');
    }
});

export default resize;