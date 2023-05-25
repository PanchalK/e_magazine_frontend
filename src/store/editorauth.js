import { createSlice } from "@reduxjs/toolkit";

let editorAuthInitials = {
  isEditorAuthenticated: JSON.parse(localStorage.getItem("editor_details")) ? true : false,
  editorEmail: JSON.parse(localStorage.getItem("editor_details")) ? JSON.parse(localStorage.getItem("editor_details")).editorEmail : null,
}

const EditorAuthSlice = createSlice({
  name: "editorauthentication",
  initialState: editorAuthInitials,
  reducers: {
    login(state, action) {
      state.isEditorAuthenticated = true;
      state.editorEmail = action.payload;
      let obj = {
        isEditorAuthenticated: true,
        editorEmail: action.payload
      }
      localStorage.setItem('editor_details', JSON.stringify(obj));
    },
    logout(state) {
      state.isEditorAuthenticated = false;
      localStorage.removeItem('editor_details');
    }
  },
  });

export const editorAuthActions = EditorAuthSlice.actions;

export default EditorAuthSlice.reducer