import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./bodyContent/Header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import AdminEditors from "./pages/AdminEditors";
import Editor from "./pages/Editor";
import AdminRegister from "./pages/AdminRegister";
import { useSelector } from "react-redux";
import Notfound from "./pages/Notfound";
import SideNavAdmin from "./bodyContent/components/SideNavAdmin";
import SideNavEditor from "./bodyContent/components/SideNavEditor";
import { HStack } from "@chakra-ui/react";
import AdminMagazine from "./pages/AdminMagazine";
import EditorMagazine from "./pages/EditorMagazine";
import EditorArticle from "./pages/EditorArticle";
import EditorPublication from "./pages/EditorPublication";
import EditorPlacementRecords from "./pages/EditorPlacementRecords";
import EditorEvents from "./pages/EditorEvents";

function App() {
  const isAdminAuth = useSelector(
    (state) => state.adminauth.isAdminAuthenticated
  );
  const isEditorAuth = useSelector(
    (state) => state.editorauth.isEditorAuthenticated
  );

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        {isAdminAuth && (
          <>
            <HStack gap="0">
              <SideNavAdmin />
              <Route path="/admin/editors">
                <AdminEditors />
              </Route>
              <Route path="/admin/magazines">
                <AdminMagazine />
              </Route>
            </HStack>
          </>
        )}
        {isEditorAuth && (
          <>
            <HStack gap="0">
              <SideNavEditor />
              <Route path="/editor/dashboard">
                <Editor />
              </Route>
              <Route path="/editor/magazines">
                <EditorMagazine />
              </Route>
              <Route path="/editor/articles">
                <EditorArticle />
              </Route>
              <Route path="/editor/publications">
                <EditorPublication />
              </Route>
              <Route path="/editor/placementrecords">
                <EditorPlacementRecords />
              </Route>
              <Route path="/editor/events">
                <EditorEvents />
              </Route>
            </HStack>
          </>
        )}

        <Route path="/adminregister">
          <AdminRegister />
        </Route>

        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
