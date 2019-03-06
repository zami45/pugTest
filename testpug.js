//import necessary libraries, dataset & base-template
const pug = require("pug");
const fs = require("fs");
const database = require("./conv_data_sports.json");
const template = "./pageTemplate/sportsTemplate.pug";
const htmlFileNames = database["menu_items"];

//delete existing html file from Resource directory if there is anys
fs.readdirSync("./Resource", (error, files) => {
  if (error) throw error;
  files
    .filter(fname => /.*?\.html$/.test(fname))
    .forEach(filename =>
      fs.unlinkSync("./Resource/" + filename, () => {
        console.log(filename);
      })
    );
});

// //get imaginary url name from user in order to generate .html file

htmlFileNames.forEach(fileObj => {
  let dest = `./Resource/${fileObj.fname}`;
  let template = `./pageTemplate/${fileObj.template}`;
  let resourceObj = { page : database[fileObj.fname] };

  let compiledFunction = pug.compileFile(template);
  fs.writeFile(dest, compiledFunction(resourceObj), "utf-8", () =>
    console.log("successfully generated")
  );
});
