import fs from 'fs';
import path from 'path';

let filesList = '';
const lsFiles = () => {
  return filesList;
};

fs.readdir(
  path.join(__dirname, '..', '..', 'images', 'full_size_images'),
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const filesLength = files.length;
      files.forEach((file) => {
        // separates filenames with vertical bar except the last one
        if (!(file === files[filesLength - 1])) {
          filesList += file + ' | ';
        } else {
          filesList += file;
        }
      });
    }
    lsFiles();
  }
);

export default lsFiles;
