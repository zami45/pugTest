//import necessery node modules
const fs = require("fs");

//delete all html files
fs.readdirSync("./Resource")
  .filter(item => /.*?\.html$/.test(item))
  .forEach(htmlfile => fs.unlinkSync("./Resource/" + htmlfile));

console.log("all html files deleted successfully")
