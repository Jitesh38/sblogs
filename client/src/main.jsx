import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router";
import {
  Login,
  Register,
  ChangePassword,
  UserProfile,
  All_Blogs,
  BlogPostPage,
  PublicUserProfile,
  BookmarkedPost,
} from "./pages/index.js";
import PostForm from "./components/post-form/PostForm.jsx";
import Protected from "./components/Protected.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<All_Blogs />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route
        path="profile"
        element={
          <Protected>
            <UserProfile />
          </Protected>
        }
      />
      <Route
        path="blog/:id"
        element={
          <Protected>
            <BlogPostPage />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected>
            <PostForm />
          </Protected>
        }
      />
      <Route
        path="/user/:username"
        element={
          <Protected>
            <PublicUserProfile />
          </Protected>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <Protected>
            <BookmarkedPost />
          </Protected>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
