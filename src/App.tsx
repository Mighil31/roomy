import React from "react";
import NavBar from "./components/NavBar";
import PlainNavbar from "./components/PlainNavbar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import MyPosts from "./components/MyPosts/MyPosts";
import PostPage from "./components/NewPost/PostPage";
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
            <Route path="/messaging/:userId?" element={<Chat />} />
            <Route path="/post/:postId?" element={<PostPage />} />
            <Route path="/myposts" element={<MyPosts />} />

          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
