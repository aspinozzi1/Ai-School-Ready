const fs=require('fs');const B=require('./g1.js');
require('./g2.js');require('./g3.js');require('./g4.js');require('./g5.js');
fs.writeFileSync(process.argv[2],`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Vibe Code Your Own Game</title><style>${B.css}</style></head><body>
${B.pages.join('\n')}</body></html>`);
console.log('pages emitted:',B.pages.length);
