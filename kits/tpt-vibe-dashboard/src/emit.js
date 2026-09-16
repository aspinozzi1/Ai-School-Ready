const fs=require('fs');const B=require('./b1.js');
require('./b2.js');require('./b3.js');require('./b4.js');require('./b5.js');
fs.writeFileSync(process.argv[2],`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Vibe Coding for Teachers - Classroom Dashboard</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}</body></html>`);
console.log('pages emitted:',B.pages.length);
