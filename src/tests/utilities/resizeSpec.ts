import fs from 'fs';
import path from 'path';
import resize from '../../utilities/resize';

describe('tests the resize function', () => {
  it('should create a resized file in thumb_images folder', () => {
    resize('fjord.jpg', 200, 200);
    const fileExistsCheck = fs.existsSync(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'images',
        'thumb_images',
        '200x200 fjord.jpg'
      )
    );
    expect(fileExistsCheck).toBe(true);
  });
});
