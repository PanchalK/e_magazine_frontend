import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./adminauth"
import editorAuthReducer from "./editorauth"

const store = configureStore({
    reducer: { adminauth: adminAuthReducer, editorauth: editorAuthReducer }
  });
  
export default store;