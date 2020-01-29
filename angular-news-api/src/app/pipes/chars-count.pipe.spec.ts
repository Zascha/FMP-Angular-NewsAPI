import { CharsCountPipe } from './chars-count.pipe';

describe('CharsCountPipe', () => {
  it('create an instance', () => {
    const pipe = new CharsCountPipe();
    expect(pipe).toBeTruthy();
  });
});
