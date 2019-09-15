import { combineReducers } from "redux"
import { editor_reducer } from "./Editor/reducer"
import { Files_Reducer } from './File/reducer';

export const reducers = combineReducers({
    editor: editor_reducer,
    files: Files_Reducer
})