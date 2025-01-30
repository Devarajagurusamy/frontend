import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import EditUser from "./components/EditUser";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import PostDetail from "./components/PostDetail";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        
        <div>
          <nav>
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/users">Users</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/posts/create">Create Post</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/logout">Logout</a></li>
            <li><a href="/profile">Profile</a></li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/signup" element={<UserForm />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
