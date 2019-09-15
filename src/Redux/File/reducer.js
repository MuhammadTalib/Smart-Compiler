import { ADD_NEW_FILE, OPEN_SELECTED_FILE, EDIT_FILE } from './action';

const initialState = {
    files: [
        // {
        //     title: "Untitled",
        //     text: "1234567899iuhgvf",
        //     type: ".txt",
        //     selected: ""
        // },
        // {
        //     title: "Untitled",
        //     text: "#include <stdio.h>\nint main(){\n 1}",
        //     type: ".txt",
        //     selected: ""
        // },
        // {
        //     title: "Untitled",
        //     text: "#include <stdio.h>\nint main(){\n 2}",
        //     type: ".txt",
        //     selected: ""
        // },
        // {
        //     title: "Untitled",
        //     text: "#include <stdio.h>\nint main(){\n 3}",
        //     type: ".txt",
        //     selected: ""
        // }
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
        default: return state
    }
}