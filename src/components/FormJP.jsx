import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/icomoon/user";
import { redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Load from "./Load";

const FormJP = ({ id=null }) => {
  function handleLogout() {}
  const role = localStorage.getItem("role");

  const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [guru, setGuru] = useState();
  const [kelas, setKelas] = useState([]);
  const [jadwal, setJadwal] = useState();
  const jam = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        url: process.env.BASE_URL+"/users/role/guru",
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



  const fetchJadwal = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log(process.env.BASE_URL)
      console.log(id,"IDIDIDIIDID");
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL+"/admin/jp/" + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data,"DSADADADA");

      setJadwal(data);
      console.log(jadwal, ">>>>>>>>>>JADWAL>>>>>>>>>>>>>");
    } catch (error) {
      console.log(error);
    }
  }, [id]);


  const postJadwal = useCallback(async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const form = new FormData(e.target);

    // Dapetin guru dan _idnya
    let guru_id = form.get("guru");
    guru_id = guru.find((item) => item._id === guru_id);
    console.log(guru);

    const formData = {
      hari: form.get("hari").toLowerCase(),
      jamKe: form.get("jamKe"),
      guru: {
        _id: guru_id._id,
        nama: guru_id.nama,
      },
      guruPengganti: null,
      kelas: form.get("kelas"),
      mapel: form.get("mapel"),
      materi: "",
      jumlahJP: "",
    };
    console.log(formData,"FORMDATA");

    try {
      const { data } = await axios({
        method: id ? "put" : "post",
        url: `${process.env.BASE_URL}/${role}/jp${id?`/${id}`:''}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      console.log(data);

      Swal.fire({
        icon: "success",
        title: id ? "Succes Updating Jadwal Pelajaran" : "Succes Adding Jadwal Pelajaran",
      });
      redirect("/jadwal");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchGuru();
    fetchKelas();
    
    id && fetchJadwal();
    
    console.log(jadwal,"<<<<<<<<<<<<<<<<<<<");
  }, []);

  if(id && !jadwal) return <Load/>

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        className="items-center justify-center md:h-screen  p-12"
      >
        
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form onSubmit={postJadwal}>
            <div className="md:flex md:gap-28">
              <div>
                <label
                  htmlFor="hari"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Hari
                </label>

                <div className="mb-5 bg-white p-3 rounded-md w-52">
                  <select className="w-full" id="hari" name="hari">
            
                    {id && jadwal && day.map((item, index) => {
                      if (`${item}`.toLowerCase() === jadwal?.hari) {
                        return (
                          <>
                            <option key={index} value={item} selected="selected">
                              {item}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                      }
                    })}
                    {
                      !id && day.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                        })
                    }

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
                      {id && jadwal && jam.map((item, index) => {
                      if (item === jadwal?.jamKe) {
                        return (
                          <>
                            <option key={index} value={item} selected="selected">
                              {item}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                      }
                    })}
                    {
                      !id && jam.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                        })
                    }

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
                    {guru?.map((item, index) => {
                      if (item._id === jadwal?.guru?._id) {
                        return (
                          <>
                            <option key={index} value={item._id} selected="selected">
                              {item.nama}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item._id}>
                              {item.nama}
                            </option>
                          </>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="kelas"
                  className="mb-3 block text-base font-medium text-white "
                >
                  Kelas
                </label>

                <div className="mb-5 bg-white p-3 rounded-md  w-52">
                  <select className="w-full" id="kelas" name="kelas">
                    {kelas.map((item, index) => {
                      if (item === jadwal?.kelas) {
                        return (
                          <>
                            <option key={index} value={item} selected="selected">
                              {item}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                      }
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
                        if (item === jadwal?.mapel) {
                          return (
                            <>
                              <option key={index} value={item} selected="selected">
                                {item}
                              </option>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <option key={index} value={item}>
                                {item}
                              </option>
                            </>
                          );
                        }
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="text-white rounded-md border-none hover:bg-green-600 bg-green-500 px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
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

export default FormJP;
