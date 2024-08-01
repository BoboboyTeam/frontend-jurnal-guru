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
import { Outlet } from "react-router-dom";
import Profile from "./page/Profile";
import Guru from "./page/Guru";
import DetailGuru from "./page/DetailGuru";
import LandingPage from "./page/LandingPage";
import TableMapel from "./page/TableMapel";
import TableKelas from "./page/TableKelas";
import TestPage from "./page/TestPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    element: <NavbarWrapper />,
    children: [
      {
        path:"/",
        element:<Home/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/page",
        element: <LandingPage />,
        element: <LandingPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jurnal/:id",
        element: <JurnalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/mapel",
        element: <TableMapel />,
      },
      {
        path: "/kelas",
        element: <TableKelas />,
      },
      {
        path: "/jp/edit/:id",
        element: <JadwalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jp/add",
        element: <JadwalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/guru",
        element: <Guru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/guru/:id",
        element: <DetailGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
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


function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
