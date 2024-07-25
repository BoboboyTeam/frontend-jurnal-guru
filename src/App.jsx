import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import JurnalGuru from "./page/JurnalGuru";
import JadwalPelajaran from "./page/JadwalPelajaran";
import DitailJurnalGuru from "./page/DitailJurnalGuru";
import DitailJadwalPelajaran from "./page/DitailJadwalPelajaran";
import EditJadwalPelajaran from "./page/EditJadwalPelajaran";
import EditJurnalGuru from "./page/EditJurnalGuru";
import JurnalReform from "./page/JurnalReform";
import JadwalReform from "./page/JadwalReform";
import Navbar from "./components/Navbar";
import {Outlet} from "react-router-dom";
import Profile from "./page/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element:<NavbarWrapper /> ,
    children: [
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/jurnal/:id",
        element: <JurnalReform />,
      },
      {
        path: "/jp/edit/:id",
        element: <JadwalReform />,
      },
      {
        path: "/jp/add",
        element: <JadwalReform />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },

      {
        path: "/jadwal",
        element: <JadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jurnal",
        element: <JurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/ditailJadwalPelajaran/:id",
        element: <DitailJadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/ditailJurnalGuru/:id",
        element: <DitailJurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/editJadwalPelajaran/:id",
        element: <EditJadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/editJurnalGuru/:id",
        element: <EditJurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

function NavbarWrapper(){
  return (
  <div>
      <Navbar/>
      <Outlet/>
  </div>
  )
};

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
