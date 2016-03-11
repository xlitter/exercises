const Stream = require('stream');
const gutil = require('gulp-util');
const Bufferstreams = require('bufferstreams');

function gulpReplaceCssLink() {
  const PLUGIN_NAME = 'gulp-replace-css-link';
  const replaceReg = /\s*<link.+?rel\s*=\s*[\'\"]stylesheet[\'\"].*?(?:\/)?>/gi;

  return new Stream.Transform({
    objectMode: true,
    transform: function transfrom(file, encoding, cb) {
      const source = file;

      function replace(input) {
        return new Buffer(input.replace(replaceReg, ''));
      }

      if (file.isBuffer()) {
        source.contents = replace(String(file.contents));
      } else if (file.isStream()) {
        source.contents = file.contents.pipe(new Bufferstreams((err, buffer, callback) => {
          if (err) {
            callback(new gutil.PluginError(PLUGIN_NAME, err));
          }
          const transformed = replace(buffer.toString());
          callback(null, transformed);
        }));
      }

      cb(null, source);
    }
  });
}

module.exports = gulpReplaceCssLink;
