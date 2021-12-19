import { ActionTypes } from "../actionTypes";
import { SearchKeyword, inputKeyword } from "./types";

const initialInputValue:SearchKeyword = {
  value: undefined
}

export const SearchKeywordReducer = (state = initialInputValue, action: inputKeyword) => {
  if ( !action.type ) return false;
  if ( ActionTypes.searchKeyword ) {
    return { ...state, value: state.value }
  }
}