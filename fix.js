const fs = require('fs');
let c = fs.readFileSync('src/lib/leekduck.ts', 'utf8');
// Fix: wrap /events/ in backticks
c = c.replace(/fetch\(\$\{LEEKDUCK_BASE\}\/events\//g, 'fetch(\x60$\x7BLEEKDUCK_BASE\x7D/events/\x60');
// Fix: wrap /boss/ in backticks
c = c.replace(/fetch\(\$\{LEEKDUCK_BASE\}\/boss\//g, 'fetch(\x60$\x7BLEEKDUCK_BASE\x7D/boss/\x60');
fs.writeFileSync('src/lib/leekduck.ts', c);
console.log('Fixed!');
