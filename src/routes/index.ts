import express from 'express';
import path from 'path';
import fs from 'fs';
import resize from '../utilities/resize';
import resizeAll from '../utilities/resizeAll';
import lsFiles from '../utilities/listFiles';

const routes: express.Router = express.Router();

// loads static assets like images and pug files
routes.use(express.static(path.join(__dirname, '..', '..', 'images')));
routes.use(express.static(path.join(__dirname, '..', '..', 'views')));

// redirects http://localhost:3000/api to http://localhost:3000/api/resize
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.redirect('/api/resize');
});

// listens to queries and redirects to appropriate function
routes.get(
  '/resize',
  async (req: express.Request, res: express.Response): Promise<void> => {
    // change query strings into appropriate formats for functions
    const filename = String(req.query.filename);
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // check if user specified filename, width, and height
    if (req.query.filename && req.query.width && req.query.height) {
      // check if file exists and width/height are valid
      if (
        fs.existsSync(
          path.join(
            __dirname,
            '..',
            '..',
            'images',
            'full_size_images',
            filename
          ) 
        ) && !isNaN(width) && !isNaN(height) && width >= 0 && height >= 0
      ) {
        // check if file has already been resized
        if (
          fs.existsSync(
            path.join(
              __dirname,
              '..',
              '..',
              'images',
              'thumb_images',
              width + 'x' + height + ' ' + filename
            )
          )
        ) {
          // if it exists, send existing file
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
        } else {
          // resize the full size image to the requested width and height
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
        }
      } else {
        res.statusCode = 404;
        res.send(
          'The file you requested does not exist or your width/height ' +
          'was provided with non-numeric or negative values </br>' +
            '<a href="http://localhost:3000">Go back to instructions</a>'
        );
      }
      // if user specified only width and height, call the resizeAll function
    } else if (req.query.width && req.query.height) {
        if (!isNaN(width) && !isNaN(height) && width >= 0 && height >= 0) {
          await resizeAll(width, height);
          res.send(
          'Files have been resized </br>' + '<a href="/">Go back to main app</a>');
        } else {
          res.send('Width and/or height values are invalid!</br>' +
          '<a href="http://localhost:3000">Go back to instructions</a>');
        }
      // if user specified filename and file exists, show full size image
    } else if (req.query.filename) {
      // checks if file exists
      if (
        fs.existsSync(
          path.join(
            __dirname,
            '..',
            '..',
            'images',
            'full_size_images',
            filename
          )
        )
      ) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        res.sendFile(
          path.join(
            __dirname,
            '..',
            '..',
            'images',
            'full_size_images',
            filename
          )
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
  }
);

export default routes;
