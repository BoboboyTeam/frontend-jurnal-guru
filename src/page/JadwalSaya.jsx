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
import { useDispatch, useSelector } from "react-redux";
import { selectDataKelas, selectLoadingKelas } from "../redux/selectorRedux";
import { fetchDataKelas } from "../redux/kelasRedux";
import Load from "../components/Load";
const JadwalSaya = () => {
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
  const kelas = useSelector(selectDataKelas);
  const kelasLoading = useSelector(selectLoadingKelas);
  const dispatch = useDispatch();
  const [jadwalId, setJadwalId] = useState(null);
  const [jurnal, setJurnal] = useState(null);
  const [searchTeacher, setSearchTeacher] = useState();
  const [searchKelas, setSearchKelas] = useState();
  const [searchHari, setSearchHari] = useState();
  const [loading, setLoading] = useState(false);

  const searchEvent = async (e) => {
    try {
      console.log(e.target.value);
      let query = "";

      switch (e.target.id) {
        case "searchTeacher":
          query += `?teacher=${e.target.value}`;
          if (searchHari) query += `&hari=${searchHari}`;
          if (searchKelas) query += `&kelas=${searchKelas}`;
          setSearchTeacher(e.target.value);
          break;
        case "searchHari":
          query += `?hari=${e.target.value}`;
          setSearchHari(e.target.value);
          if (searchTeacher) query += `&teacher=${searchTeacher}`;
          if (searchKelas) query += `&kelas=${searchKelas}`;
          break;
        case "searchKelas":
          query += `?kelas=${e.target.value}`;
          setSearchKelas(e.target.value);
          if (searchTeacher) query += `&teacher=${searchTeacher}`;
          if (searchHari) query += `&hari=${searchHari}`;
          break;
      }
      console.log(query);
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/teacher/myjp${query}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setResult(data);
      fetchDataKelas();
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------Fetching data all
  async function fetchData() {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const { data } =
        localStorage.getItem("role")?.toLowerCase() === "admin"
          ? await axios({
              method: "get",
              url: process.env.BASE_URL + "/teacher/myjp",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios({
              method: "get",
              url: process.env.BASE_URL + "/teacher/myjp",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      console.log(data);

      // Absence Condition
      let getJurnal;
      if (localStorage.getItem("role").toLowerCase() === "teacher") {
        getJurnal = await axios({
          method: "get",
          url: process.env.BASE_URL + "/teacher/jurnal-teacher/now",
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
            console.log(item.jamKe, "Item Jam Ke");
            console.log(getJurnal.data[index]?.mapel, "Jurnal Mapel");
            console.log(item.mapel, "Item Mapel");

            let condition
            condition = getJurnal.data.find((condItem)=>condItem?.jamKe === item.jamKe && condItem?.mapel._id === item.mapel._id && condItem?.teacher?._id === item.teacher?._id)
            console.log(`item ${index} : ${condition}`);
            // condition = getJurnal.data[index]?.jamKe === item.jamKe;
            // condition = getJurnal.data[index]?.mapel === item.mapel;
            // condition =
            //   getJurnal.data[index]?.teacher?._id === item.teacher?._id;

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

      console.log(data,"DATA");
      setResult(data);
      setLoading(false);
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
        title: "Data Deleted Successfully",
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
    dispatch(fetchDataKelas());
  }, []);
  if (loading || kelasLoading) {
    return (
      <Load />
    );
  }

  return (
    <div className="m-auto w-full h-screen bg-purple-100 ">
      <div className="text-gray-900 bg-purple-100 pb-10 ">
        <div className="p-4  flex justify-between w-full  md:justify-end gap-5  bg-white  sticky top-0 ">
          <div className="text-3xl font-bold text-purple-500 pt-3 mr-[45rem]">
            MY SCHEDULE
          </div>
          {(
            <>
              <div className="w-32 mt-3 ">
                <form action="">
                  <select
                    className="w-full h-12 outline-none border-2 border-slate-400   rounded-md px-4 bg-white"
                    id="searchHari"
                    name="hari"
                    onChange={searchEvent}
                  >
                    {day.map((item) => {
                      if (item === "All Days") {
                        return (
                          <option value={""} selected>
                            {item}
                          </option>
                        );
                      }
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
                    id="searchKelas"
                    onChange={searchEvent}
                  >
                    <option value="">All Class</option>
                    {kelas?.map((item) => {
                      return (
                        <>
                          <option value={item.nama}>{item.nama}</option>
                        </>
                      );
                    })}
                  </select>
                </form>
              </div>
            </>
          )}
        </div>

        <div className="px-3  flex justify-center   ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center">
            <thead className="sticky top-[5rem] bg-purple-500  ">
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Day</th>
                <th className="text-center p-3 px-5">Working Hours</th>
                <th className="text-center p-3 px-5">Class</th>
                <th className="text-center p-3 px-5">Subject</th>
                <th className="text-center p-3 px-5">Teacher</th>
                <th className="text-center p-3 px-5"></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {result?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-purple-100 bg-white "
                  >
                    <td className="p-3 px-5">{++index}</td>
                    <td className="p-3 px-5">{item?.hari}</td>
                    <td className="p-3 px-5">{item?.jamKe}</td>
                    <td className="p-3 px-5">{item?.kelas?.nama}</td>
                    <td className="p-3 px-5">{item?.mapel?.nama}</td>
                    <td className="p-3 px-5">{item?.teacher?.nama}</td>
                    <td className="p-3 px-5 flex justify-center">
                      <Link to={"/ditailJadwalPelajaran/" + item?._id}>
                        {" "}
                        <button className="btn mr-3 text-sm bg-white border-purple-700 hover:bg-purple-500 text-slate-900  hover:text-white">
                          <Icon icon={externalLink} /> Detail
                        </button>
                      </Link>
                      
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

export default JadwalSaya;
