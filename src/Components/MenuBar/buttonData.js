
import { saveAs, NewFile, OpenFile } from './../../Backend/fileHandler';
import { store } from './../../Redux/store';
import { lexicalAnalyzer } from './../../Backend/LexicalAnalyzer/lexicalAnalyzer';
export const buttonData = [
    {
        title: "File",
        dropDowns: [
            {
                subItem: "New File",
                clickHandler: () => {
                    console.log("Clicked", "this.subItem")
                    NewFile()
                }
            },
            {
                subItem: "Open File",
                clickHandler: () => {
                    console.log("Clicked", "open file")
                    OpenFile()
                }
            },
            {
                subItem: "Save",
                clickHandler: () => {
                    saveAs()
                }
            },
            {
                subItem: "Save As",
                clickHandler: () => {
                    saveAs()
                }
            },

        ]
    },
    {
        title: "Terminal",
        dropDowns: [
            {
                subItem: "New",
                clickHandler: () => {
                    console.log("Clicked", "this.subItem")
                }
            },
            {
                subItem: "Open",
                clickHandler: () => {
                    console.log("Clicked", "this.subItem")
                }
            },
            {
                subItem: "Save",
                clickHandler: () => {
                    console.log("Clicked", "this.subItem")
                }
            },
        ]
    }
]

export const run = () => {
    var text = store.getState().files.selectedFile.text
    lexicalAnalyzer(text)
}