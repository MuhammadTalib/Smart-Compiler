export const ADD_NEW_FILE = "ADD_NEW_FILE"
export const OPEN_SELECTED_FILE = "OPEN_SELECTED_FILE"
export const EDIT_FILE = "EDIT_FILE"

export const add_new_file = () => {
    return {
        type: ADD_NEW_FILE
    }
}
export const open_selected_file = (selected_file) => {
    return {
        type: OPEN_SELECTED_FILE,
        selectedFile: selected_file
    }
}
export const edit_file = (text) => {
    return {
        type: EDIT_FILE,
        text
    }
}