import { saveAs as saveas } from 'file-saver';
import { store } from '../../Redux/store';

export var Tindex=1
export var Lindex=1
export var ThreeAdressCode=""
export const createLabel=()=>{
    return "L"+Lindex++;
}
export const createTemp=()=>{
    return "t"+Tindex++;
}
export const Output=(str)=>{
    ThreeAdressCode+=str+"\n"
}
export const savingIntermediateCode=()=>{
    console.log("intermediate code")
    var file = store.getState().files.selectedFile
    var filename = "IntermediateCodeof"+file.title
    while (true) {
        if (file) {
            var blob = new Blob([ThreeAdressCode],
                { type: "text/plain;charset=utf-8" });
            saveas(blob, filename);
            break;
        } else {
            console.log("undefined")
        }
    }
}