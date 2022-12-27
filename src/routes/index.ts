import express from 'express';
import path from 'path';
import fs from 'fs';
import resize from '../utilities/resize';
import resizeAll from '../utilities/resizeAll';
import lsFiles from '../utilities/listFiles';

const routes = express.Router();

// loads static assets like images and pug files
routes.use(express.static(path.join(__dirname, '..', '..', 'images')));
routes.use(express.static(path.join(__dirname, '..', '..', 'views')));

// redirects http://localhost:3000/api to http://localhost:3000/api/resize
routes.get('/', (req, res) => {
  res.redirect('/api/resize');
});

// listens to queries and redirects to appropriate function
routes.get('/resize', async (req, res) => {
  // change query strings into appropriate formats for functions
  const filename = String(req.query.filename);
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // if user specified filename, width, and height, call resize function
  if (req.query.filename && req.query.width && req.query.height) {
    await resize(filename, width, height);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile(
      path.join(
        __dirname,
        '..',
        '..',
        'images',
        'thumb_images',
        width + 'x' + height + ' ' + filename
      )
    );
    // if user specified only width and height, call the resizeAll function
  } else if (req.query.width && req.query.height) {
    await resizeAll(width, height);
    res.send(
      'Files have been resized </br>' + '<a href="/">Go back to main app</a>'
    );
    // if user specified filename and file exists, show full size image
  } else if (req.query.filename) {
    // checks if file exists
    if (
      fs.existsSync(
        path.join(__dirname, '..', '..', 'images', 'full_size_images', filename)
      )
    ) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpg');
      res.sendFile(
        path.join(__dirname, '..', '..', 'images', 'full_size_images', filename)
      );
    } else {
      res.statusCode = 404;
      res.send(
        'The file you requested does not exist </br>' +
          '<a href="http://localhost:3000">Go back to instructions</a>'
      );
    }
    // if none of the legal queries are specified, send instructions
  } else {
    const filesList = lsFiles();
    res.render(path.join(__dirname, '..', '..', 'views', 'index.pug'), {
      filesList: filesList
    });
  }
});

export default routes;
