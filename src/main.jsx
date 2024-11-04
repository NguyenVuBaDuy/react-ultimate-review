import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error.jsx';
import TodoApp from './components/todo/TodoApp.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx'
import RegisterPage from './pages/register.jsx'
import LoginPage from './pages/login.jsx'
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/book",
        element: <PrivateRoute><BookPage /></PrivateRoute>
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "login",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  // </React.StrictMode>,
)
