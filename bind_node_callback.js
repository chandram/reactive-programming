import * as fs from "fs";
import * as Rx from "rxjs";
import { map, mergeMap } from "rxjs/operators";

const readFile = Rx.bindNodeCallback(fs.readFile);
// Note from reactivex.io 
// It's just like bindCallback, but the callback is expected to be of type callback(error, result).

const watch = Rx.bindNodeCallback(fs.watch);

const filenames$ = watch("./var/tmp").pipe(
  map( ([event, filename]) => filename )
);

filenames$.pipe(
  mergeMap((filename) =>
    // read file
    readFile(filename).pipe(
      map( (content) => ({filename, content}) )
    )
  )
  .subscribe( ({filename, content}) => console.log(filename, content.length) ); 
)
