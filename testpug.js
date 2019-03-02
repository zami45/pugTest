//import necessary libraries
const pug = require("pug");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const database = require("./database.json");

//grab the base template
const template = "./pugFiles/sports.pug";


//delete existing html file if there is anys
fs.readdir("./Resource", (error, files) => {
  if (error) throw error;
  files
    .filter(name => /.*?\.html$/.test(name))
    .forEach(e => fs.unlinkSync("./Resource/" + e));
});

//get imaginary url name from user
readline.question(`What's your url?`, name => {

  let dest = `./Resource/${name}.html`;
  let resourceObj = { sports: database[name] };

  let compiledFunction = pug.compileFile(template);
  fs.writeFile(dest, compiledFunction(resourceObj), "utf-8", () =>
    console.log("success")
  );
  readline.close();

});
