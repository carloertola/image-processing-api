import sharp from 'sharp';
import path from 'path';
import resize from '../routes/resize';

const resizer = async (fn: string, w: number, h: number) => {
    console.log('Entered resizer function');
    console.log(path.join(__dirname + "..", "..", "full_size_images", fn));
    try {
        await sharp(path.join(__dirname, "..", "..", "full_size_images", fn))
        .resize(w, h)
        .toFile(path.join(__dirname, "..", "..", "thumb_images", `resized_${fn}`))
    } catch (err) {
        console.log(`Oops! There seems to be an error:</br>${err}`);
    }
}
export default resizer;