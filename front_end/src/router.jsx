import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SudPage from "./pages/SudPage";
import NonoPage from "./pages/NonoPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import SudGame from "./components/SudGame";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/login/", element: <Login />},
        { path: "/signup/", element: <SignUp />},
        { path: "/sudoku/", element: <SudPage />},
        { path: "/sudoku/:id", element: <SudGame /> },
        { path: "/nonogram/", element: <NonoPage />},
        { path: "/profile/", element: <ProfilePage />}, //make PrivateRoute?
        { path: "*", element: <NotFound /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
  
  export default router;