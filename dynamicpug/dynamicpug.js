const pug = require("pug");

const pugheader = "./mylayout/header.pug";
const pugSkeleton =  generatePugString({pugheader:pugheader});

function generatePugString(obj){
    return `doctype html\ninclude ${obj.pugheader}`
}

const compileFn = pug.compile(pugSkeleton,{
    filename: 'pug',
    pretty : true
});

const generatedHtml = compileFn({titelString:"Sample Title"})
console.log(generatedHtml)