import express from 'express';
import resizer from '../utilities/resizeImage';

const resize = express.Router();

// passing query parameters to function that handles resize
resize.get('/', async (req, res) => {
    let filename = req.query.filename,
        width = Number(req.query.width),
        height = Number(req.query.height);
    resizer(filename as string, width, height);
    res.send('Image successfully resized');
});

export default resize;