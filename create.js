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
  const dest = `./Resource/${eachMenu.link}`
  const link_definition = database.link_definitions[eachMenu.link]
  const content = { page: link_definition }
  content.page.commonHeader = database.link_definitions.commonHeader
  const templatePath = database.skeletons[link_definition.skeleton].path
  const pugheader = templatePath + "/header.pug"
  const pugfooter = templatePath + "/footer.pug"
  const pugpagetemplate = templatePath+"/" + link_definition.template
  const pugSkeleton = generatePugString({ header : pugheader , footer : pugfooter, page : pugpagetemplate })

  const compileFn = pug.compile(pugSkeleton, {
    filename: "pug",
    pretty: true
  });
  
  fs.writeFile(dest, compileFn(content), "utf-8", () =>
    console.log(eachMenu.link + "-successfully generated.")
  );
}

function generatePugString(obj){
  return `doctype html\ninclude ${obj.header}\ninclude ${obj.page}\ninclude ${obj.footer}`
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
  try {
    fs.readdirSync("./Resource")
      .filter(item => /.*?\.html$/.test(item))
      .forEach(htmlfile => fs.unlinkSync("./Resource/" + htmlfile));
  } catch (e) {
    console.log(e);
  }
}