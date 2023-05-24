import { createSlice } from "@reduxjs/toolkit";

let adminAuthInitials = {
  isAdminAuthenticated: JSON.parse(localStorage.getItem("admin_details")) ? true : false,
  adminName: ""
}

const AdminAuthSlice = createSlice({
    name: "adminauthentication",
    initialState: adminAuthInitials,
    reducers: {
      login(state) {
        state.isAdminAuthenticated = true;
        let obj = {
          isAdminAuthenticated: true,
          adminName: ""
        }
        localStorage.setItem('admin_details', JSON.stringify(obj));
      },
      logout(state) {
        state.isAdminAuthenticated = false;
        localStorage.removeItem('admin_details');
      },
      save(state,action){
        state.adminName = action.payload
      }
    },
  });

export const adminAuthActions = AdminAuthSlice.actions;

export default AdminAuthSlice.reducer