var fs = require("fs");
var c = fs.readFileSync("src/components/ui/PixelButton.tsx", "utf8");
var bt = String.fromCharCode(96);
var dol = String.fromCharCode(36);
// Fix className={${baseClasses}    } -> className={`${baseClasses}`}
c = c.replace("className={" + dol + "{baseClasses}    }", "className={" + bt + dol + "{baseClasses}" + bt + "}");
fs.writeFileSync("src/components/ui/PixelButton.tsx", c);
console.log("Fixed PixelButton.tsx");
