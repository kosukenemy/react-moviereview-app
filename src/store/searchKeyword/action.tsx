import { ActionTypes } from "../actionTypes";
import { inputKeyword } from "./types";

export const searchKeyword = ():inputKeyword => {
  return {
    type: ActionTypes.searchKeyword
  }
}

