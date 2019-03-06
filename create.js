//import necessary libraries, dataset & base-template
const pug = require("pug");
const fs = require("fs");
const database = require("./conv_data_sports.json");
const htmlFileNames = database["menu_items"];

//delete existing html file from Resource directory if there is any
deleteAllHtmlFile()

//traverse menuitems
traverseMenuItemsRecursive(htmlFileNames);

//to generate .html file
function generateHtml(eachMenu) {
  let dest = `./Resource/${eachMenu.link}`;
  let template = `./pageTemplate/${eachMenu.template}`;
  let resourceObj = { page: database["link_definitions"][eachMenu.label] };
  resourceObj.page.commonHeader = database["link_definitions"]["commonHeader"];

  let compiledFunction = pug.compileFile(template);
  fs.writeFile(dest, compiledFunction(resourceObj), "utf-8", () =>
    console.log(eachMenu.link + "-successfully generated.")
  );
}

function traverseMenuItemsRecursive(menuItems = []) {
  menuItems.forEach(eachMenu => {
    if (eachMenu.shouldGeneratePage === true) {
      generateHtml(eachMenu);
      if (eachMenu.hasOwnProperty("submenu"))
        traverseMenuItemsRecursive(eachMenu.submenu);
    } else {
      if (eachMenu.hasOwnProperty("submenu"))
        traverseMenuItemsRecursive(eachMenu.submenu);
    }
  });
}

function deleteAllHtmlFile() {
  fs.readdirSync("./Resource")
    .filter(item => /.*?\.html$/.test(item))
    .forEach(htmlfile => fs.unlinkSync("./Resource/" + htmlfile));
}
