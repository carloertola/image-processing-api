import sharp from 'sharp';
import path from 'path';

const resize = async (
  filename: string,
  width: number | null | undefined,
  height: number | null | undefined
) => {
  try {
    await sharp(
      path.join(__dirname, '..', '..', 'images', 'full_size_images', filename)
    )
      .resize(width, height)
      .toFile(
        path.join(
          __dirname,
          '..',
          '..',
          'images',
          'thumb_images',
          `${width}x${height} ${filename}`
        )
      );
  } catch (err) {
    console.log(`Oops! There seems to be an error:</br>${err}`);
  }
};
export default resize;
