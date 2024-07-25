import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/icomoon/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormJurnal = ({id=null}) => {
  function handleLogout() {}

  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const [guru, setGuru] = useState([]);
  const [jurnal, setJurnal] = useState([]);
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

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  // ------------------------------------------------------Get all data

  const fetchGuru = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL+"/users/guru",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGuru(data);
      console.log(JSON.stringify(guru));
      guru.map((item) => {
        console.log(item.nama);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const fetchKelas = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL+"/kelas",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
  
  const fetchJurnalGuru = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role");
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL+"/"+role+"/jurnal-guru/"+id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setJurnal(data);
    } catch (error) {
      console.log(error);
    }
  });

  const postJurnalGuru = useCallback(async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const form = new FormData(e.target);

    // Dapetin guru dan _idnya
    let guru_id = form.get("guru");
    let guruPengganti_id = form.get("guruPengganti");
    guru_id = guru.find((item) => item._id === guru_id);
    guruPengganti_id = guru.find((item) => item._id === guruPengganti_id);
    console.log(guru);

    const formData = {
      hari: form.get("hari").toLowerCase(),
      jamKe: form.get("jamKe"),
      guru: {
        _id: guru_id._id,
        nama: guru_id.nama,
      },
      guruPengganti: guruPengganti_id ? {
        _id: guruPengganti_id._id,
        nama: guruPengganti_id.nama
        } : null,
      kelas: form.get("kelas"),
      mapel: form.get("mapel"),
      materi: form.get("materi"),
      jumlahJP: form.get("jumlahJP"),
    };
    console.log(formData);

    try {
      const { data } = await axios({
        method: id ? "put" : "post",
        url: process.env.BASE_URL+"/admin/jurnal-guru",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      console.log(data);

      Swal.fire({
        icon: "success",
        title: id ? "Success Updating Jurnal" : "Succes Adding Jurnal",
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchGuru();
    if (id) {
      fetchJurnalGuru();
    }
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        className="items-center justify-center md:h-screen  p-12"
      >
        <div className="flex justify-end mb-3  ">
          <div className=" bg-yellow-600 inline-block px-2 py-2 rounded-md hover:bg-yellow-700">
            <button onClick={handleLogout}>
              {" "}
              <Icon size={30} icon={user}></Icon> Logout{" "}
            </button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form onSubmit={postJurnalGuru}>
            <div className="md:flex md:gap-28">
              <div>
                <label
                  htmlFor="hari"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Hari
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="hari" name="hari">
                    {day.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item}>
                            {item}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="jamKe"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Jam ke
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="jamKe" name="jamKe">
                      {jam.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <label
                  htmlFor="guru"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Guru
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="guru" name="guru">
                    <option value="">None</option>
                    {guru.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.nama}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <label
                  htmlFor="guruPengganti"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Guru Pengganti{" "}
                  <span className="font-light text-sm">(Opsional)</span>
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select
                    className="w-full"
                    id="guruPengganti"
                    name="guruPengganti"
                  >
                    <option value="">None</option>
                    {guru?.map((item) => {
                      return (
                        <>
                          <option key={item._id} value={item._id}>
                            {item.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="kelas"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Kelas
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="kelas" name="kelas">
                    {kelas.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item}>
                            {item}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="mapel"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Mata Pelajaran
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="mapel" name="mapel">
                      {mataPelajaran.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
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
                  name="materi"
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
                    name="jumlahJP"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="text-white rounded-md border-none hover:bg-yellow-600 bg-yellow-400 bg-opacity-50 px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormJurnal;
