import sharp from 'sharp';
import path from 'path';
import resize from '../routes/resizeRoute';

const resizer = async (fn: string, w: number, h: number) => {
    try {
        await sharp(path.join(__dirname, "..", "..", "full_size_images", fn))
        .resize(w, h)
        .toFile(path.join(__dirname, "..", "..", "thumb_images", `resized_${w}x${h}_${fn}`))
    } catch (err) {
        console.log(`Oops! There seems to be an error:</br>${err}`);
    }
}
export default resizer;