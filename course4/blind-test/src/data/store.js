import { createStore, combineReducers } from "redux";
import { playerReducer } from "./playerReducer";

export const store = createStore(
  combineReducers({
    player: playerReducer,
  })
);
