import React from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { userCircleO } from "react-icons-kit/fa/userCircleO";
import Icon from "react-icons-kit";
import { ic_exit_to_app_twotone } from "react-icons-kit/md/ic_exit_to_app_twotone";


const Navbar = () => {
  const navigate = useNavigate();
  
  function handdleDeletePopUp() {
    document.getElementById("my_modal_7").showModal();
  }

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  

  return (
    <div className="w-full  bg-white  h-24 sticky top-0 flex pl-6 gap-2 border-b-2 border-slate-400 justify-center md:justify-between z-50  ">
      <div className="flex">
        <div>
          <img
            src="https://ummusshabri.sch.id/template/awal/assets/img/logo-pesri.png"
            width={80}
            alt=""
            srcSet=""
          />
        </div>

        <div className="mt-1">
          <img src={Logo} width={70} alt="" srcSet="" />
        </div>
      </div>

      <div className="p-4  flex justify-center w-full  md:justify-start  bg-white sticky top-20 ">
        <div className="w-[700px] mt-3  flex justify-start gap-5  ">
          <Link to={"/jadwal"}>
            <button className="bg-green-500 hover:bg-green-700 px-5 py-2 rounded-md text-white focus:bg-green-700 ">
              Jadwal Pelajaran
            </button>
          </Link>
          <Link to={"/jurnal"}>
            <button className="bg-green-500 hover:bg-green-700 px-5 py-2 rounded-md text-white focus:bg-green-700 ">
              Jurnal Guru
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-4 mr-16">
        <Link to={"/profile"}>
          {" "}
          <Icon size={46} icon={userCircleO} />
        </Link>
        <p>Profile</p>
      </div>

      <div className="mt-4 mr-16">
        <button onClick={handdleDeletePopUp}>
          <Icon size={46} icon={ic_exit_to_app_twotone} />

          <p>Logout</p>
        </button>
      </div>

      <dialog id="my_modal_7" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Apakah yakin ingin Logout?
          </h3>
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
                Batal
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;
