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
    element : <Home/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/jadwal",
    element : <JadwalPelajaran/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/jurnal",
    element : <JurnalGuru/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/ditailJadwalPelajaran",
    element : <DitailJadwalPelajaran/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/ditailJurnalGuru",
    element : <DitailJurnalGuru/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/editJadwalPelajaran",
    element : <EditJadwalPelajaran/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
  },
  {
    path: "/editJurnalGuru",
    element : <EditJurnalGuru/>,
    loader:async()=>{
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login")
        
      }
      return null
    }
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
