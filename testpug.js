//import necessary libraries & dataset
const pug = require("pug");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const database = require("./database.json");

//grab the base template
const template = "./pugTemplate/layout.pug";

//delete existing html file from Resource directory if there is anys
fs.readdir("./Resource", (error, files) => {
  if (error) throw error;
  files
    .filter(fname => /.*?\.html$/.test(fname))
    .forEach(filename => fs.unlinkSync("./Resource/" + filename));
});

//get imaginary url name from user in order to generate .html file
readline.question(`What's your url?`, name => {
  let dest = `./Resource/${name}.html`;
  let resourceObj = { sports: database[name] };

  let compiledFunction = pug.compileFile(template);
  fs.writeFile(dest, compiledFunction(resourceObj), "utf-8", () =>
    console.log("successfully generated")
  );
  readline.close();
});
