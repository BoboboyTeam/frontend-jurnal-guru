import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { ic_lock_outline_twotone } from "react-icons-kit/md/ic_lock_outline_twotone";
import { ic_lock_open } from "react-icons-kit/md/ic_lock_open";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [icon, setIcon] = useState(ic_lock_open);
  const [type, setType] = useState("password");
  const navigate = useNavigate()

   // -----------------------------------------------------REGISTER

   async function handdleRegister(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const requestBody = {nama, email, role, password};
      const { data } = await axios.post(
        process.env.BASE_URL+"/register",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Succes register",
      });
      console.log(data);
      navigate("/cms");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handdlePassword() {
    if (type === "password") {
      setIcon(ic_lock_outline_twotone);
      setType("text");
    } else {
      setIcon(ic_lock_open);
      setType("password");
    }
  }

  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://ummusshabri.sch.id/template/awal/assets/img/logo-pesri.png"
                width={150}
                alt=""
                srcSet=""
              />
              <h1 className="mb-2 text-md">
                Islamic School of Ummusabri Kendari{" "}
              </h1>
              <span className="text-gray-300">Enter Register Details</span>
            </div>
            <form onSubmit={handdleRegister}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                  value={nama}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none  bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>

              <div className="mb-4 text-sm">
                <select
                  className="rounded-xl w-64 h-10 border-none bg-black opacity-60 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="text-center">Pilih Role</option>
                  <option className="text-center" value="Teacher">
                    Teacher
                  </option>
                  <option className="text-center" value="Admin">
                    Admin
                  </option>
                </select>
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none  bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type={type}
                  name="Passowrd"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
              <div
                onClick={handdlePassword}
                className="hover:cursor-pointer rounded-sm py-1 flex justify-center bg-black opacity-30  mr-2 "
              >
                <Icon size={30} icon={icon} />
              </div>
              <div className="flex gap-4 justify-center">

              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500  px-7 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-700"
                >
                  Daftar
                </button>
              </div>

              <div className="mt-8 flex justify-center text-lg text-black">
                <Link to={"/jadwal"} ><button                 
                  className="rounded-md bg-blue-500  px-7 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-700"
                >
                Kembali
                </button></Link>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
