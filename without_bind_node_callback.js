import * as fs from "fs";
const fileNames$ = ["./var/tmp/file1.json", "./var/tmp/file3.json", "./var/tmp/file3.json"];

fileNames$.forEach( filename => {
  //perform file read
  fs.readFile(filename, (error, response) => {
    if (error) throw error;
    //response is the file content
    console.log(filename, response.length);
  });
});
