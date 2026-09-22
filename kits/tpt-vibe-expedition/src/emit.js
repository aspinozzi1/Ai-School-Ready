const fs=require('fs');const B=require('./e1.js');
require('./e2.js');require('./e3.js');require('./e4.js');require('./e5.js');
fs.writeFileSync(process.argv[2],`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>The Long Road</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}</body></html>`);
console.log('pages emitted:',B.pages.length);
