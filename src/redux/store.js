import { combineReducers, createStore } from "redux";
import { booksReduser } from "./booksReduser";
import { authReduser } from "./isAuthreduser";

const redusers = combineReducers({
    booksReduser,
    authReduser
})

export const store = createStore(redusers)