const fs=require('fs');const B=require('./u1.js');
require('./u2.js');require('./u3.js');require('./u4.js');require('./u4b.js');require('./u4c.js');require('./u5.js');
fs.writeFileSync(process.argv[2],`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Pitch to Prototype</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}</body></html>`);
console.log('pages emitted:',B.pages.length);
