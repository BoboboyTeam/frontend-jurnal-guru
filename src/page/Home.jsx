import axios from "axios";
import React, { useEffect } from "react";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/icomoon/user";
import { useNavigate } from "react-router-dom";



const Home = () => {
  function handleLogout() {

  }

  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const guru = ["", "Budi", "Budi1", "Budi2", "Budi3", "Budi4"];
  const kelas = ["VII", "VIII", "IX"];
  const jam = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const mataPelajaran = [
    "Matematika",
    "Bahasa Inggris",
    "Bahasa Jawa",
    "IPA",
    "IPS",
    "Biologi",
  ];

  const navigate = useNavigate();

  async function handdleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  // ------------------------------------------------------Get all data

  
  async function fetchData() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }





  useEffect(()=>{
    fetchData()



  })



  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        className="items-center justify-center p-12  "
      >
        <div className="flex justify-end mb-3  ">
          <div className=" bg-yellow-600 inline-block px-2 py-2 rounded-md hover:bg-yellow-700">
         <button onClick={handdleLogout}>   <Icon size={30} icon={user}></Icon> Logout{" "}</button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <div className="md:flex md:gap-28">
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Hari
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="day">
                    {day.map((item) => {
                      return (
                        <>
                          <option value="hari">{item}</option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Jam ke
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="day">
                      {jam.map((item) => {
                        return (
                          <>
                            <option value="hari">{item}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Guru
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="day">
                    {guru.map((item) => {
                      return (
                        <>
                          <option value="hari">{item}</option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Guru Pengganti{" "}
                  <span className="font-light text-sm">(Opsional)</span>
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="day">
                    {guru.map((item) => {
                      return (
                        <>
                          <option value="hari">{item}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Kelas
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="day">
                    {kelas.map((item) => {
                      return (
                        <>
                          <option value="kelas">{item}</option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Mata Pelajaran
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="day">
                      {mataPelajaran.map((item) => {
                        return (
                          <>
                            <option value="hari">{item}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Materi Pembelajaran
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Jumlah Jam Pelajaran
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="text-white rounded-md border-none hover:bg-yellow-600 bg-yellow-400 bg-opacity-50 px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
