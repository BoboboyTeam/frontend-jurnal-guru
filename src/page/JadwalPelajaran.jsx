import React, { useEffect, useState } from "react";
import { bin } from "react-icons-kit/icomoon/bin";
import { plus } from "react-icons-kit/fa/plus";
import { pencilSquareO } from "react-icons-kit/fa/pencilSquareO";
import { externalLink } from "react-icons-kit/fa/externalLink";

import { iosCheckmark } from "react-icons-kit/ionicons/iosCheckmark";
import { Icon } from "react-icons-kit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const JadwalPelajaran = () => {
  const [result, setResult] = useState([]);
  const day = [
    "All Days",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const kelas = ["VII", "VIII", "IX"];
  const [jadwalId, setJadwalId] = useState(null);
  const [jurnal, setJurnal] = useState(null);
  const [searchGuru, setSearchGuru] = useState();
  const [searchKelas, setSearchKelas] = useState();
  const [searchHari, setSearchHari] = useState();

  const searchByGuru = async (e) => {
    try {
      console.log(e.target.value);
      let query = "?";
      if (e.target.id ==='searchGuru') query += `guru=${e.target.value}`;
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/admin/jp${query}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------Fetching data all
  async function fetchData() {
    try {
      const token = localStorage.getItem("access_token");

      const { data } =
        localStorage.getItem("role") === "admin"
          ? await axios({
              method: "get",
              url: process.env.BASE_URL + "/admin/jp",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios({
              method: "get",
              url: process.env.BASE_URL + "/guru/jp",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      console.log(data);

      // Absence Condition
      let getJurnal;
      if (localStorage.getItem("role") === "guru") {
        getJurnal = await axios({
          method: "get",
          url: process.env.BASE_URL + "/guru/jurnal-guru/now",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(getJurnal.data, "JOURNAL<<<<<<<<<<<<<<<,");
        // Get Journal This Day
        let jurnalCheck = [];
        data.forEach((item, index) => {
          if (getJurnal.data.length > 0) {
            console.log(getJurnal.data[index]?.jamKe, "Jurnal Jam Ke");
            let condition = getJurnal.data[index]?.jamKe === item.jamKe;
            condition = getJurnal.data[index]?.mapel === item.mapel;
            condition = getJurnal.data[index]?.guru?._id === item.guru?._id;

            if (condition) {
              jurnalCheck.push(1);
              console.log("Jurnal Sudah Ada");
            } else {
              jurnalCheck.push(0);
            }
          } else {
            jurnalCheck.push(0);
          }
        });
        setJurnal(jurnalCheck);
      }

      console.log(data);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------------DELETE
  function handdleDeletePopUp(jadwalId) {
    setJadwalId(jadwalId);
    document.getElementById("my_modal_1").showModal();
  }

  async function handdleDelete() {
    const token = localStorage.getItem("access_token");
    const link = process.env.BASE_URL + "/admin/jp/" + jadwalId;
    const response = await axios({
      method: "delete",
      url: link,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    try {
      const token = localStorage.getItem("access_token");
      const response = axios({
        method: "delete",
        url: process.env.BASE_URL + "/admin/jp/" + jadwalId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.fire({
        icon: "success",
        title: "Data Terhapus",
      });
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-auto w-full h-screen bg-blue-100 ">
      <div className="text-gray-900 bg-blue-100 pb-10 ">
        <div className="p-4  flex justify-center w-full  md:justify-end gap-5  bg-white  sticky top-20 ">
          <div className="text-3xl font-bold text-blue-500 pt-3 mr-[550px]">
            LESSEON SCHEDULE
          </div>

          <div className="w-32 mt-3 ">
            <form action="">
              <select
                className="w-full h-12 outline-none border-2 border-slate-400   rounded-md px-4 bg-white"
                id="hari"
                name="hari"
              >
                {day.map((item) => {
                  return (
                    <>
                      <option value={item}>{item}</option>
                    </>
                  );
                })}
              </select>
            </form>
          </div>

          <div className="w-32 mt-3 ">
            <form action="">
              <select
                className="w-full h-12 outline-none border-2 border-slate-400   rounded-md px-4 bg-white"
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
                id="searchGuru"
                className="w-full h-12 rounded-md px-4 outline-none border-2 bg-white border-slate-400 "
                type="text"
                onChange={searchByGuru}
                placeholder="Cari Nama Guru"
              />
            </form>
          </div>

          {localStorage.getItem("role") === "admin" && (
            <Link to={"/jp/add"}>
              <button className="btn  text-white bg-green-500 hover:bg-green-700 mt-3 px-4">
                <Icon icon={plus} /> Create Schedule
              </button>
            </Link>
          )}
        </div>

        <div className="px-3  flex justify-center   ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center">
            <thead className="sticky top-40 bg-blue-500  ">
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Day</th>
                <th className="text-center p-3 px-5">Class</th>
                <th className="text-center p-3 px-5">Teacher</th>
                <th className="text-center p-3 px-5"></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-100 bg-white "
                  >
                    <td className="p-3 px-5">{++index}</td>
                    <td className="p-3 px-5">{item?.hari}</td>
                    <td className="p-3 px-5">{item?.kelas}</td>
                    <td className="p-3 px-5">{item?.guru?.nama}</td>
                    <td className="p-3 px-5 flex justify-center">
                      <Link to={"/ditailJadwalPelajaran/" + item?._id}>
                        {" "}
                        <button className="btn mr-3 text-sm bg-white border-blue-700 hover:bg-blue-500 text-slate-900  hover:text-white">
                          <Icon icon={externalLink} /> Detail
                        </button>
                      </Link>
                      {localStorage.getItem("role") === "guru" &&
                        jurnal[index - 1] < 1 && (
                          <Link to={"/jurnal/" + item._id}>
                            {" "}
                            <button className="btn  border-green-700 hover:bg-green-500  text-slate-900  hover:text-white mr-2">
                              <Icon icon={plus} /> Add Journal
                            </button>
                          </Link>
                        )}
                      {localStorage.getItem("role") === "guru" &&
                        jurnal[index - 1] > 0 && (
                          <div className="border p-[0.6rem] rounded-lg border-green-700 bg-green-500  text-white mr-2">
                            <p>
                              <Icon icon={iosCheckmark} /> Journal Has Been
                              Added
                            </p>
                          </div>
                        )}
                      {localStorage.getItem("role") === "admin" && (
                        <>
                          <Link to={"/editJadwalPelajaran/" + item._id}>
                            {" "}
                            <button className="btn bg-green-100 border-green-700 hover:bg-green-500  text-slate-900  hover:text-white mr-2">
                              <Icon icon={pencilSquareO} /> Edit
                            </button>
                          </Link>
                          <button
                            className="btn  border-red-700 hover:bg-red-500 bg-white  text-slate-900  hover:text-white"
                            onClick={() => handdleDeletePopUp(item._id)}
                          >
                            <Icon icon={bin} />
                            Delete
                          </button>

                          <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                Are you sure you want to delete this data?
                              </h3>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button
                                    onClick={() => {
                                      handdleDelete();
                                    }}
                                    className="btn bg-red-500 hover:bg-red-700 text-white"
                                  >
                                    Delete
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
                        </>
                      )}
                    </td>
                  </tr>
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
