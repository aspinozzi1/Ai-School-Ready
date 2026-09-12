const fs = require('fs');
const B = require('./build.js');
require('./build2.js');
require('./build3.js');
require('./build5.js');
require('./build4.js');
const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Make a Self-Checking Practice Activity</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}
</body></html>`;
fs.writeFileSync(process.argv[2], html);
console.log('pages emitted:', B.pages.length);
