import { createStore } from "redux";
import { reducers } from "./combineReducers";

export const store = createStore(reducers);
