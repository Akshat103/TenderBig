import { configureStore } from "@reduxjs/toolkit";
// Action Types
const SET_KEYWORDS = "SET_KEYWORDS";

// Action Creators
export const setKeywords = (keywords) => ({
type: SET_KEYWORDS,
payload: keywords,
});

// Reducer
const initialState = {
keywords: [],
};

const reducer = (state = initialState, action) => {
switch (action.type) {
case SET_KEYWORDS:
return {
...state,
keywords: action.payload,
};
default:
return state;
}
};

const store = configureStore({
reducer: reducer,
});

export default store;