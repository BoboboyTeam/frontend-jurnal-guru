import React, { useEffect, useState } from "react";
import { bin } from "react-icons-kit/icomoon/bin";
import { pencilSquareO } from "react-icons-kit/fa/pencilSquareO";
import { externalLink } from "react-icons-kit/fa/externalLink";
import { plus } from "react-icons-kit/fa/plus";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import Load from "../components/Load";
import Swal from "sweetalert2";
import GajiBulanan from "../components/GajiBulanan";
import { useDispatch, useSelector } from "react-redux";
// Import action
import { updateState } from "../redux/jurnalRedux";
import Invoice from "../components/Invoice";
import {
  selectDataJurnalGuru,
  selectDataProfile,
} from "../redux/selectorRedux";

const JurnalGuru = ({ isProfile = false, id = false, addons = false }) => {
  const [result, setResult] = useState([]);
  const role = localStorage.getItem("role")?.toLowerCase();
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 7));
  const [to, setTo] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .slice(0, 7)
  );
  const [idJurnal, setIdJurnal] = useState(null);

  // Query

  const profile = useSelector(selectDataProfile);
  const dataJP = useSelector(selectDataJurnalGuru);

  // Redux
  const dispatch = useDispatch();

  const searchByTeacher = async (e) => {
    try {
      const token = localStorage.getItem("access_token");
      const link = `${process.env.BASE_URL}/${role}/jurnal-teacher/?teacher=${e.target.value}`;
      console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchData() {
    try {
      const token = localStorage.getItem("access_token");

      const link = id
        ? `${role}/filter/jurnal-teacher/teacher/${id}`
        : `${role}/jurnal-teacher`;
      const profileLink =
        isProfile | (role === "teacher") ? `${role}/jurnal-teacher` : "";

      const trueLink = role === "teacher" ? profileLink : link;
      console.log(`${process.env.BASE_URL}/${trueLink}`);
      let { data } = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${trueLink}`,
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

  const filterByDate = async () => {
    try {
      const monthlyName = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      setResult([]);
      const fromMonth = from.split("-")[1];
      const fromYear = from.split("-")[0];
      const token = localStorage.getItem("access_token");
      console.log(fromYear, "AAAAAAAAAAAA");
      const query = `?month=${fromMonth}&year=${fromYear}`;
      console.log(query);
      const link = `${process.env.BASE_URL}/${role}/filter/jurnal-teacher/date${
        id ? `${"/" + id}` : ""
      }${query}`;
      console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data, "JURNALAAAAAAAAAAAAAAAA");
      setResult(data.data);
      let newDataJP = data.dataJP[parseInt(fromMonth) - 1];
      let keyDataJP = Object.keys(data.dataJP);
      console.log(fromMonth);
      console.log(keyDataJP.includes("6"));
      console.log(keyDataJP.includes(fromMonth + ""));
      // for(let i = fromMonth; i<=toMonth; i++){

      //   if(keyDataJP.includes(i.toString())){

      //     newDataJP = data.dataJP[i];
      //     break;
      //   }
      // }
      console.log(data);
      console.log("ASDASDAS");
      dispatch(
        updateState({
          ...newDataJP,
          month: monthlyName[parseInt(fromMonth) - 1],
          year: fromYear,
        })
      );
      console.log(newDataJP);
      setResult(data.data);
    } catch (error) {
      const monthlyName = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      setResult([]);
      const fromMonth = from.split("-")[1];
      const fromYear = from.split("-")[0];
      console.log(error);
      dispatch(
        updateState({
          month: monthlyName[parseInt(fromMonth) - 1],
          year: fromYear,
        })
      );
      setResult([]);
    }
  };

  function handdleDeletePopUp(idJurnal) {
    setIdJurnal(idJurnal);
    document.getElementById("my_modal_1").showModal();
  }

  async function handdleDelete() {
    const token = localStorage.getItem("access_token");
    const link = `${process.env.BASE_URL}/${role}/jurnal-teacher/` + idJurnal;
    console.log(link);
    const response = await axios({
      method: "delete",
      url: link,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
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
    await fetchData();
  }

  useEffect(() => {
    fetchData();
    console.log(profile);
    if (isProfile) filterByDate();
  }, []);

  return (
    <div className="m-auto w-full h-screen bg-green-100">
      <div className="text-gray-900 bg-green-100">
        <div
          className={`p-4 gap-10  flex justify-center w-full  md:justify-end bg-white sticky ${
            isProfile ? "top-0" : "top-20"
          }  `}
        >
          <div className="text-3xl font-bold text-green-500 pt-3 w-[700px] ">
            TEACHER JOURNAL
          </div>

          <div className="flex justify-end gap-1 w-[80%] items-center ">
            <p className="bg-green-400 text-[#184210] font-bold p-2 rounded-md">
              Journal on :{" "}
              <input
                type="month"
                className="p-1 rounded-md bg-green-300"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
              />
            </p>
            {/* <p className="bg-green-400 text-[#184210] font-bold p-2 rounded-md">
            To  :  <input type="month" className="p-1 rounded-md bg-green-300" onChange={(e)=>setTo(e.target.value)} value={to}/>
          </p> */}

            <div className="w-[20%] self-center">
              <button
                className="p-3 rounded-md bg-green-500 hover:bg-green-600 font-bold  text-white"
                onClick={() => filterByDate()}
              >
                Set Filter
              </button>
            </div>
          </div>

          {isProfile &&
            localStorage.getItem("role").toLowerCase() === "admin" && (
              <Invoice
                nama={profile?.data.nama}
                tanggal={from}
                data={{
                  data: result,
                  dataJP,
                  columnName: [
                    "Date",
                    "Start Hours",
                    "Lesson Material",
                    "Working Hours",
                    "Payment",
                  ],
                  keyColumns: [
                    "updateAt",
                    "jamKe",
                    "materi",
                    "jumlahJP",
                    "Payment",
                  ],
                  profile,
                }}
              />
            )}

          {!isProfile && (
            <form className="mt-3 " action="">
              <input
                className="w-96 h-12 rounded-md bg-slate-200 px-4 outline-none border-2 border-slate-400 "
                type="text"
                placeholder="Search Teacher"
                onChange={searchByTeacher}
              />
            </form>
          )}

          {!isProfile &&
            localStorage.getItem("role").toLowerCase() === "admin" && (
              <Link to={"/jurnal/add"}>
                <button className="btn w-[10rem] text-white bg-green-500 hover:bg-green-700 mt-3">
                  <Icon icon={plus} /> Create Jurnal
                </button>
              </Link>
            )}
        </div>

        {isProfile && <GajiBulanan id={id} />}

        <div className="px-3 flex justify-center  ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center overflow-x-scroll">
            <thead className={` bg-green-500`}>
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Date</th>
                <th className="text-center p-3 px-5">Teacher</th>
                <th className="text-center p-3 px-5">Class</th>
                <th className="text-center p-3 px-5">Teacher Replacement</th>
                <th className="text-center p-3 px-5">Jam Ke</th>
                <th className="text-center p-3 px-5">Jumlah JP</th>
                <th className="text-center p-3 px-5"></th>
                <th />
              </tr>
            </thead>

            {result ? (
              <>
                <tbody>
                  {result?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b hover:bg-green-100 bg-white "
                      >
                        <td className="p-3 px-5">{++index}</td>
                        <td className="p-3 px-5">{item?.createAt}</td>
                        <td className="p-3 px-5">{item?.teacher?.nama}</td>
                        <td className="p-3 px-5">{item?.kelas?.nama}</td>
                        <td className="p-3 px-5">
                          {item?.teacherReplacement?.nama}
                        </td>
                        <td className="p-3 px-5">{item?.jamKe}</td>
                        <td className="p-3 px-5">{item?.jumlahJP}</td>
                        <td className="p-3 px-5 flex justify-center">
                          <Link to={"/ditailJurnalGuru/" + item._id}>
                            <button className="btn mr-3 text-smborder border-blue-700 hover:bg-blue-500 text-slate-900 bg-white hover:text-white">
                              <Icon icon={externalLink} /> Detail
                            </button>
                          </Link>
                          {localStorage.getItem("role")?.toLowerCase() ===
                            "admin" && (
                            <>
                              <Link to={"/editJurnalGuru/" + item._id}>
                                {" "}
                                <button className="btn border bg-white border-green-700 hover:bg-green-500 text-slate-900 mr-2  hover:text-white">
                                  <Icon icon={pencilSquareO} /> Edit
                                </button>
                              </Link>

                              <button
                                className="btn border border-red-700 hover:bg-red-500 text-slate-900 bg-white hover:text-white"
                                onClick={() => handdleDeletePopUp(item._id)}
                              >
                                <Icon icon={bin} />
                                Delete
                              </button>
                            </>
                          )}

                          <dialog
                            id="my_modal_1"
                            className="modal text-slate-900"
                          >
                            <div className="modal-box bg-white">
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ) : (
              <Load />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default JurnalGuru;
