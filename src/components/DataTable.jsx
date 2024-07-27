import React, { useEffect, useState } from "react";
import { bin } from "react-icons-kit/icomoon/bin";
import { pencilSquareO } from "react-icons-kit/fa/pencilSquareO";
import { externalLink } from "react-icons-kit/fa/externalLink";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import Load from "../components/Load";
import Swal from "sweetalert2";

const DataTable = ({ columns, detail, query, parentLink, color = null }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");

  const [keylog, setKeylog] = useState(columns ? columns : []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  // -----------------------------------------------------DELETE
  function handdleDeletePopUp(id) {
    setId(id);
    document.getElementById("delete_modal").showModal();
  }

  async function handdleDelete() {
    const token = localStorage.getItem("access_token");
    console.log(id);
    console.log(`${process.env.BASE_URL}/${role}/${detail}/` + id);
    const response = await axios({
      method: "delete",
      url: `${process.env.BASE_URL}/${role}/${detail}/` + id,
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
    await fetchData()
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${role}/${detail}?${query ? query : ""}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tempDict = response.length > 0 ? Object.keys(response.data[0]) : {};
      setKeylog(columns ? columns : tempDict);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(columns);
    fetchData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="px-3 py-4 flex justify-center mt-16  ">
      <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center overflow-x-scroll">
        <thead className={`${color ? color.primary : "bg-slate-600"} w-full`}>
          <tr className="border-b  ">
            <th className="text-center p-3 px-5 ">No</th>
            {keylog?.map((item, index) => (
              <th key={index} columns={index} className="text-center p-3 px-5">
                {item}
              </th>
            ))}
            <th className="text-center p-3 px-5 ">Control Panel</th>
          </tr>
        </thead>

        {data ? (
          <>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    columns={index}
                    className="border-b hover:bg-green-100 bg-gray-100 "
                  >
                    <td className="p-3 px-5">{++index}</td>
                    {keylog.map((columns, index) => {
                      if (columns.includes("guru")) {
                        return (
                          <td key={index} columns={index} className="p-3 px-5">
                            {item[columns].nama}
                          </td>
                        );
                      }
                      return (
                        <td key={index} columns={index} className="p-3 px-5">
                          {item[columns]}
                        </td>
                      );
                    })}

                    <td className="p-3 px-5 flex justify-center">
                      <Link to={`/${parentLink}/` + item._id}>
                        <button className="btn mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white">
                          <Icon icon={externalLink} /> Ditail
                        </button>
                      </Link>

                      <Link to={`/${parentLink}/edit/` + item._id}>
                        {" "}
                        <button className="btn text-white bg-green-500 hover:bg-green-700 mr-2">
                          <Icon icon={pencilSquareO} /> Edit
                        </button>
                      </Link>

                      <button
                        className="btn bg-red-500 hover:bg-red-700 text-white"
                        onClick={() => handdleDeletePopUp(item._id)}
                      >
                        <Icon icon={bin} />
                        Hapus
                      </button>

                      <dialog id="delete_modal" className="modal text-[#EEEEEE]">
                        <div className="modal-box bg-gray-800">
                          <h3 className="font-bold text-lg">
                            Apakah yakin ingin menghapus data ini?
                          </h3>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                onClick={() => {
                                  handdleDelete(item._id);
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
                );
              })}
            </tbody>
          </>
        ) : (
          <Load />
        )}
      </table>
    </div>
  );
};

export default DataTable;