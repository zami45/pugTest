const fs = require("fs");
console.log("hi")
//delete existing html file from Resource directory if there is any
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