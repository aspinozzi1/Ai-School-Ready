const fs=require('fs');const B=require('./s1.js');
require('./s2.js');require('./s3.js');
fs.writeFileSync(process.argv[2],`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>The Class Store</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}</body></html>`);
console.log('pages emitted:',B.pages.length);
