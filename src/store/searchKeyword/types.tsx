import { type } from "os";
import React from "react";
import { Action } from "redux";
import { ActionTypes } from "../actionTypes";

export type SearchKeyword = {
  value: undefined
};

interface SearchKeyWordAction extends Action {
  type: typeof ActionTypes.searchKeyword;
}

export type inputKeyword = SearchKeyWordAction;