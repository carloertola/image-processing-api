import express from 'express';
import path from 'path';
import { CLIENT_RENEG_WINDOW } from 'tls';
import resizer from '../utilities/resizeImage';

const resize = express.Router();

// passing query parameters to function that handles resize if they exist
resize.get('/', async (req, res) => {
    if(req.query.filename) {
        let filename = req.query.filename,
        width = Number(req.query.width),
        height = Number(req.query.height);
        const filePath = path.join(__dirname,'..','..','thumb_images','resized_', filename as string);

        resizer(filename as string, width, height);
        res.send('Image successfully resized');
    } else {
        res.send('Please enter a query with your details like this example:</br>' +
        '<code>http://localhost:3000/api/resize?filename=encenadaport.jpg&width=200&height=400</code>');
    }
});

export default resize;