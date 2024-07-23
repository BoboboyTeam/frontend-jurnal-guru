import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { bin } from "react-icons-kit/icomoon/bin";
import { plus } from "react-icons-kit/fa/plus";
import { pencilSquareO } from "react-icons-kit/fa/pencilSquareO";
import { externalLink } from "react-icons-kit/fa/externalLink";
import { Icon } from "react-icons-kit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const JadwalPelajaran = () => {
  const [result, setResult] = useState([]);
  const day = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const kelas = ["VII", "VIII", "IX"];
  const { id } = useParams();

  // -----------------------------------------------------Fetching data all
  async function fetchData() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/admin/jp",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------------Fetching data per id
  async function fetchDataId() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/admin/jurnal-guru/" + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------------DELETE
  function handdleDeletePopUp() {
    document.getElementById("my_modal_1").showModal();
  }

  function handdleDelete() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Data Terhapus",
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-auto w-full h-screen bg-blue-100 ">
      <Navbar />
      <div className="text-gray-900 bg-blue-100 pb-10 ">
        <div className="p-4  flex justify-center w-full  md:justify-end gap-5  bg-white  sticky top-20">
          <div className="w-32 mt-3 ">
            <form action="">
              <select
                className="w-full h-12 outline-none border-2 border-slate-400   rounded-md px-4"
                id="day"
              >
                {day.map((item) => {
                  return (
                    <>
                      <option value="hari">{item}</option>
                    </>
                  );
                })}
              </select>
            </form>
          </div>

          <div className="w-32 mt-3 ">
            <form action="">
              <select
                className="w-full h-12 outline-none border-2 border-slate-400   rounded-md px-4"
                id="day"
              >
                {kelas.map((item) => {
                  return (
                    <>
                      <option value="hari">{item}</option>
                    </>
                  );
                })}
              </select>
            </form>
          </div>

          <div className="w-80 rounded-md mt-3">
            <form action="">
              <input
                className="w-full h-12 rounded-md px-4 outline-none border-2 border-slate-400 "
                type="text"
                placeholder="Cari Nama Guru"
              />
            </form>
          </div>

          <Link to={"/register"}>
            <button className="btn  text-white bg-green-500 hover:bg-green-700 mt-3">
              <Icon icon={plus} /> Tambah Guru
            </button>
          </Link>
        </div>

        <div className="px-3 py-4 flex justify-center mt-16  ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center">
            <thead className="sticky top-40 bg-blue-500  ">
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Hari</th>
                <th className="text-center p-3 px-5">Kelas</th>
                <th className="text-center p-3 px-5">Guru</th>
                <th className="text-center p-3 px-5"></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => {
                return (
                  <>
                    <tr className="border-b hover:bg-blue-100 bg-gray-100 ">
                      <td className="p-3 px-5">{++index}</td>
                      <td className="p-3 px-5">{item.hari}</td>
                      <td className="p-3 px-5">{item.kelas}</td>
                      <td className="p-3 px-5">{item.guru.name}</td>
                      <td className="p-3 px-5 flex justify-center">
                        <Link to={"/ditailJadwalPelajaran"}>
                          {" "}
                          <button className="btn mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white">
                            <Icon icon={externalLink} /> Ditail
                          </button>
                        </Link>
                        <Link to={"/editJadwalPelajaran"}>
                          {" "}
                          <button className="btn text-white bg-green-500 hover:bg-green-700 mr-2">
                            <Icon icon={pencilSquareO} /> Edit
                          </button>
                        </Link>
                        <button
                          className="btn bg-red-500 hover:bg-red-700 text-white"
                          onClick={() => handdleDeletePopUp()}
                        >
                          <Icon icon={bin} />
                          Hapus
                        </button>

                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Apakah yakin ingin menghapus data ini?
                            </h3>
                            <div className="modal-action">
                              <form method="dialog">
                                <button
                                  onClick={() => {
                                    handdleDelete();
                                  }}
                                  className="btn bg-red-500 hover:bg-red-700 text-white"
                                >
                                  Hapus
                                </button>
                              </form>
                              <form method="dialog">
                                <button className="btn bg-green-500 hover:bg-green-700 text-white">
                                  Kembali
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalPelajaran;
