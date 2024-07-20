import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import CMS from "./page/CMS";
import JurnalGuru from "./page/JurnalGuru";








const router = createBrowserRouter([
  {
    path: "/login",
    element : <Login/>
  },
  {
    path: "/register",
    element : <Register/>
  },
  {
    path: "/home",
    element : <Home/>
  },
  {
    path: "/cms",
    element : <CMS/>
  },
  {
    path: "/jurnal",
    element : <JurnalGuru/>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
