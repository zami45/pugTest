//import necessary libraries
const pug = require("pug");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

//generate html file from pug file

let src = "./pugFiles/sports.pug";
let resource = [
  {
    name: "Cricket",
    cssUrl: "cric.css",
    rules: ["play with a bat", "3 stumps"],
    img: "cricket.jpeg"
  },
  {
    name: "Football",
    cssUrl: "football.css",
    rules: ["play with a ball", "2 goal post"],
    img: "football.jpeg"
  }
];

readline.question(`What's your url?`, name => {
  fs.readdir("./Html", (error, files) => {
    if (error) throw error;
    files
      .filter(name => /.*?\.html$/.test(name))
      .forEach(e => fs.unlinkSync("./Html/" + e));
  });

  let resourceObj = {};
  if (name === "cricket") resourceObj = { sports: resource[0] };
  else resourceObj = { sports: resource[1] };
  let dest = `./Html/${name}.html`;
  let compiledFunction = pug.compileFile(src);
  fs.writeFile(dest, compiledFunction(resourceObj), "utf-8", () =>
    console.log("success")
  );
  readline.close();
});
