var fs = require("fs");
var c = fs.readFileSync("src/lib/leekduck.ts", "utf8");
var bt = String.fromCharCode(96);
var dol = String.fromCharCode(36);
c = c.replace("fetch(" + dol + "{LEEKDUCK_BASE}/events/,", "fetch(" + bt + dol + "{LEEKDUCK_BASE}/events/" + bt + ",");
c = c.replace("fetch(" + dol + "{LEEKDUCK_BASE}/boss/,", "fetch(" + bt + dol + "{LEEKDUCK_BASE}/boss/" + bt + ",");
c = c.replace("link ? " + dol + "{LEEKDUCK_BASE} :", "link ? " + bt + dol + "{LEEKDUCK_BASE}" + bt + " :");
fs.writeFileSync("src/lib/leekduck.ts", c);
console.log("Done");
