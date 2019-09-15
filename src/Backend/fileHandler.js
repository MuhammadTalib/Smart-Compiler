import { saveAs as saveas } from 'file-saver';
import { store } from './../Redux/store';
import { add_new_file } from './../Redux/File/action';
import { isPunctuator } from './LexicalAnalyzer/validationFunctions';

//const fs = require('fs')

export const saveAs = () => {
    var file = store.getState().files.selectedFile
    var text = file.text
    var filename = file.title
    while (true) {
        console.log("filename", filename)
        if (file) {
            var blob = new Blob([text],
                { type: "text/plain;charset=utf-8" });
            saveas(blob, filename);
            break;
        } else {
            console.log("undefined")
        }
    }
}

export const NewFile = () => {
    store.dispatch(add_new_file())
}

export const OpenFile = () => {
    console.log("Opeen File");
    console.log("rrrrr", isPunctuator("{"))
    // Requiring fs module in which 
    // readFile function is defined. 
    //const fs = require('fs')

    // Reading data in utf-8 format 
    // which is a type of character set. 
    // Instead of 'utf-8' it can be  
    // other character set also like 'ascii' 
    // fs.readFile('input.txt', 'utf-8', (err, data) => {
    //   if (err) throw err;

    // Converting Raw Buffer to text 
    // data using tostring function. 
    //    console.log("data", data);

}