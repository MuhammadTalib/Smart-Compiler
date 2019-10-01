import { saveAs as saveas } from 'file-saver';
import { store } from './../Redux/store';
import { add_new_file } from './../Redux/File/action';

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
    document.getElementById("imageFile").click()
}

export const saveTokenSetAs = (token) => {
    var file = store.getState().files.selectedFile
    var i,text=""
    for(i in token){
        console.log(i,token[i])
        var a="(CP:"+token[i].CP+" ,VP:"+token[i].VP+" ,LineNumber:"+token[i].line+" ,Index:"+token[i].index+" )\n"
        text=text+a
    }


//var text =JSON.stringify(token.map(t=>JSON.stringify(t)))

    console.log("token",text)
    var filename = "tokenSetOf"+file.title
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