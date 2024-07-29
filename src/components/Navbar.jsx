import React from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { userCircleO } from "react-icons-kit/fa/userCircleO";
import Icon from "react-icons-kit";
import { ic_exit_to_app_twotone } from "react-icons-kit/md/ic_exit_to_app_twotone";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  function handdleDeletePopUp() {
    document.getElementById("my_modal_7").showModal();
  }

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }
  
  if(localStorage.getItem("access_token") === null){
    return
  }

  return (
    <div
      className="w-full sticky top-0  bg-blue-300  h-24 flex pl-6 gap-2 border-b-2 border-slate-100 justify-center md:justify-between z-50  "
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <Link to={"/page"}>
      <div className="flex pt-2 gap-2">
        <div>
          <img
            src="https://ummusshabri.sch.id/template/awal/assets/img/logo-pesri.png"
            width={90}
            alt=""
            srcSet=""
          />
        </div>

        <div className="mt-1">
          <img src={Logo} width={80} alt="" srcSet="" />
        </div>
      </div>
      </Link>

      <div className="p-4  flex justify-center w-full  md:justify-center  pl-56">
        <div className="w-[700px] mt-3  flex justify-start gap-5 font-bold ">
          <Link to={"/jadwal"}>
            <button className="bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-md text-white focus:bg-blue-900 focus:scale-110 hover:scale-110 hover:duration-100 ">
              Lesson Schedule
            </button>
          </Link>
          <Link to={"/jurnal"}>
            <button className="bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-md text-white focus:bg-blue-900 focus:scale-110 hover:scale-110 hover:duration-100 ">
              Teacher Journal
            </button>
          </Link>
          {role === "admin" && (
            <Link to={"/guru"}>
              <button className="bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-md text-white focus:bg-blue-900 focus:scale-110 hover:scale-110 hover:duration-100  ">
                List Of Teachers
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-4 mr-5" style={{ color: "#10439F" }}>
        <Link to={"/profile"}>
          {" "}
          <Icon size={46} icon={userCircleO} />
        </Link>
        <p>Profile</p>
      </div>

      <div className="mt-4 mr-16" style={{ color: "#10439F" }}>
        <button onClick={handdleDeletePopUp}>
          <Icon size={46} icon={ic_exit_to_app_twotone} />

          <p>Logout</p>
        </button>
      </div>
      <dialog id="my_modal_7" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure want to logout</h3>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="btn bg-red-500 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </form>
            <form method="dialog">
              <button className="btn bg-green-500 hover:bg-green-700 text-white">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;
