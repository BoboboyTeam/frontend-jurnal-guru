import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { bin } from "react-icons-kit/icomoon/bin";
import { pencilSquareO } from "react-icons-kit/fa/pencilSquareO";
import { externalLink } from "react-icons-kit/fa/externalLink";
import Swal from "sweetalert2";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import axios from "axios";

const JurnalGuru = () => {
  const [result, setResult] = useState([]);
  async function fetchData() {
    try {
      const token = localStorage.getItem("access_token");
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/admin/jurnal-guru",
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




  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-auto w-full h-screen">
      <Navbar />

      <div className="text-gray-900 bg-white pb-10  ">
        <div className="p-4  flex justify-center w-full  md:justify-start  bg-white sticky top-20 ">
          <div className="w-[700px] mt-3  flex justify-start gap-5  ">
            <Link to={"/cms"}>
              <button className="bg-green-500 hover:bg-green-700 px-5 py-2 rounded-md text-white ">
                Jadwal Pelajaran
              </button>
            </Link>
            <Link to={"/jurnal"}>
              <button className="bg-green-500 hover:bg-green-700 px-5 py-2 rounded-md text-white ">
                Jurnal Guru
              </button>
            </Link>
          </div>

          <form className="mt-3 ml-80" action="">
            <input
              className="w-96 h-12 rounded-md px-4 outline-none border-2 border-slate-400 "
              type="text"
              placeholder="Cari Nama Guru"
            />
          </form>
        </div>

        <div className="px-3 py-4 flex justify-center mt-16  ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center">
            <thead className="sticky top-40 bg-red-500  ">
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Tanggal</th>
                <th className="text-center p-3 px-5">Guru</th>
                <th className="text-center p-3 px-5">Guru Pengganti</th>
                <th className="text-center p-3 px-5">Jumlah JP</th>
                <th className="text-center p-3 px-5"></th>
                <th />
              </tr>
            </thead>

            <tbody>
              {result.map((item, index) => {
                return (
                  <>
                    <tr className="border-b hover:bg-red-100 bg-gray-100 ">
                      <td className="p-3 px-5">{++index}</td>
                      <td className="p-3 px-5">{item.createAt}</td>
                      <td className="p-3 px-5">{item.guru}</td>
                      <td className="p-3 px-5">{item.guruPengganti}</td>
                      <td className="p-3 px-5">5</td>
                      <td className="p-3 px-5 flex justify-center">
                        <button className="btn mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white">
                          <Icon icon={externalLink} /> Ditail
                        </button>

                        <dialog id="my_modal_6" className="modal">
                          <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Ditail</h3>
                            <tr className="border-b hover:bg-blue-100 bg-gray-100">
                              <td className="p-3 px-5">1</td>
                              <td className="p-3 px-5">2</td>
                              <td className="p-3 px-5">3</td>
                              <td className="p-3 px-5">4</td>
                              <td className="p-3 px-5"></td>
                              <td className="p-3 px-5">5</td>
                              <td className="p-3 px-5">6</td>

                              <td className="p-3 px-5">7</td>
                              <td className="p-3 px-5">8</td>
                            </tr>

                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn text-white bg-green-500 hover:bg-green-700 mr-2">
                                  <Icon icon={pencilSquareO} /> Edit
                                </button>
                              </form>
                              <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>

                        <button className="btn text-white bg-green-500 hover:bg-green-700 mr-2">
                          <Icon icon={pencilSquareO} /> Edit
                        </button>

                        <dialog id="my_modal_5" className="modal">
                          <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Edit</h3>
                            <p className="py-4">
                              Click the button below to close
                            </p>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>

                        <button className="btn bg-red-500 hover:bg-red-700 text-white">
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
                                <button className="btn bg-red-500 hover:bg-red-700 text-white">
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

export default JurnalGuru;
