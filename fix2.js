const fs = require('fs');  
let c = fs.readFileSync('src/lib/leekduck.ts', 'utf8');  
c = c.replace(/fetch\(\$\{LEEKDUCK_BASE\}\/events\//g, 'fetch(\x60/events/\x60');  
c = c.replace(/fetch\(\$\{LEEKDUCK_BASE\}\/boss\//g, 'fetch(\x60/boss/\x60');  
fs.writeFileSync('src/lib/leekduck.ts', c);  
console.log('done'); 
