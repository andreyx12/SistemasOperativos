
import { ADD_VALUE, REMOVE_VALUE, EDIT_VALUE } from "../Constants/action-types";

export const addValue = value => ({ type: ADD_VALUE, payload: value });

export const removeValue = id => ({ type: REMOVE_VALUE, payload: id });

export const editValue = value => ({ type: EDIT_VALUE, payload: value });