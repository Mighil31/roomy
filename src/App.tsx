import React from "react";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import NewPostForm from "./components/NewPost/NewPostForm";
import RequireAuth from "./components/Login/RequireAuth";

function PageWithNavBar() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWithNavBar />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Feed />} />
            <Route path="/messaging" element={<Chat />} />
            <Route path="/newPost" element={<NewPostForm />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
