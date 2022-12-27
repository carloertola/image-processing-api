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
      files.forEach((file) => {
        filesList += file + ' | ';
      });
    }
    lsFiles();
  }
);

export default lsFiles;
