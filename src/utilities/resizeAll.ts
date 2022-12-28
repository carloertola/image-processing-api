import fs from 'fs';
import path from 'path';
import resize from '../utilities/resize';

const resizeAll = async (
  width: number | null | undefined,
  height: number | null | undefined
) => {
  await fs.readdir(
    path.join(__dirname, '..', '..', 'images', 'full_size_images'),
    (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          resize(file, width, height);
        });
      }
    }
  );
};

export default resizeAll;
