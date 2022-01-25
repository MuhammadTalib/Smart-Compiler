import { saveAs, NewFile, OpenFile } from "./../../Backend/fileHandler";
import { store } from "./../../Redux/store";
import { lexicalAnalyzer } from "./../../Backend/LexicalAnalyzer/lexicalAnalyzer";
export const buttonData = [
  {
    title: "File",
    dropDowns: [
      {
        subItem: "New File",
        clickHandler: () => {
          NewFile();
        },
      },
      {
        subItem: "Open File",
        clickHandler: () => {
          OpenFile();
        },
      },
      {
        subItem: "Save",
        clickHandler: () => {
          saveAs();
        },
      },
      {
        subItem: "Save As",
        clickHandler: () => {
          saveAs();
        },
      },
    ],
  },
  {
    title: "Terminal",
    dropDowns: [
      {
        subItem: "New",
        clickHandler: () => {},
      },
      {
        subItem: "Open",
        clickHandler: () => {},
      },
      {
        subItem: "Save",
        clickHandler: () => {},
      },
    ],
  },
];

export const run = () => {
  var text = store.getState().files.selectedFile.text;
  lexicalAnalyzer(text);
};
