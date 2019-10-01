import { ADD_NEW_FILE, OPEN_SELECTED_FILE, EDIT_FILE, OPEN_NEW_FILE } from './action';

const initialState = {
    files: [
       
    ],
    selectedFile: {
        selected: ""
    }
}
export const Files_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_FILE: {
            var newFile = {
                title: "untitled",
                text: "#include <stdio.h>\nint main(){\n \n}",
                type: ".txt",
                selected: "selected"
            }
            var fileArr = [...state.files]
            fileArr.map(f => f.selected = "")
            fileArr.push(newFile)

            return {
                ...state,
                files: fileArr,
                selectedFile: newFile
            }
        }
        case OPEN_SELECTED_FILE: {
            fileArr = [...state.files]
            fileArr.map(f => f.selected = f === action.selectedFile ? "selected" : "")
            var selected = { ...action.selectedFile, selected: "selected" }

            return {
                ...state,
                files: fileArr,
                selectedFile: selected

            }
        }
        case EDIT_FILE: {
            fileArr = [...state.files]
            fileArr.map(f => f.text = f === action.selectedFile ? action.text : f.text)
            selected = { ...state.selectedFile, text: action.text }
            return {
                ...state,
                files: fileArr,
                selectedFile: selected

            }
        }
        case OPEN_NEW_FILE:{
            var openFile = {
                title: action.openedFile.fileName ,
                text: action.openedFile.text,
                type: "",
                selected: "selected"
            }
            fileArr=[...state.files]
            fileArr.map(f => f.selected = "")
            fileArr.push(openFile)
            
            return{
                ...state,
                files: fileArr,
                selectedFile: openFile
            }
        }
        default: return state
    }
}