const sass = require('sass.js');

module.exports = function (content) {
    const callback = this.async();
    const savePath = this.resourcePath.replace(this.query.input, '');
    if (!content) return callback(null, `export default {}`);
    sass.compile(content, (result) => {
        if (result.status === 0) {
            this.emitFile(savePath.replace('scss', 'css'), result.text || '');
            callback(null, `export default {}`);
        } else {
            callback(new Error(result.formatted));
        }
    });
};