import lsFiles from '../../utilities/listFiles';

describe('tests the listFiles function', async () => {
  it('should display filenames of existing files as expected', () => {
    expect(lsFiles()).toEqual(
      'encenadaport.jpg | fjord.jpg | ' +
        'icelandwaterfall.jpg | palmtunnel.jpg | santamonica.jpg'
    );
  });
});
