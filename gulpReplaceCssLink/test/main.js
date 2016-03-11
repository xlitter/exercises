const fs = require('fs');
const should = require('should');
const File = require('vinyl');
const concatStream = require('concat-stream');
const replaceCssLink = require('../replace');

describe('gulp-replace-css-link', () => {
  describe('replaceCssLink()', () => {
    it('should replace link on a stream', (done) => {
      const file = new File({
        path: 'test/origin/one.html',
        cwd: 'test/',
        base: 'test/origin',
        contents: fs.createReadStream('test/origin/one.html')
      });
      const stream = replaceCssLink();

      stream.on('data', (newFile) => {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(concatStream({ encoding: 'string' }, (data) => {
          data.should.equal(fs.readFileSync('test/expect/one.html', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

    it('should replace link on a buffer', (done) => {
      const file = new File({
        path: 'test/origin/one.html',
        cwd: 'test/',
        base: 'test/origin',
        contents: fs.readFileSync('test/origin/one.html')
      });

      const stream = replaceCssLink();

      stream.on('data', (newFile) => {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should
          .equal(fs.readFileSync('test/expect/one.html', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('should trigger events on a stream', (done) => {
      const file = new File({
        path: 'test/origin/one.html',
        cwd: 'test/',
        base: 'test/origin',
        contents: fs.readFileSync('test/origin/one.html')
      });

      const stream = replaceCssLink();

      stream.on('finish', () => {
        done();
      });

      stream.write(file);
      stream.end();
    });
  });
});
