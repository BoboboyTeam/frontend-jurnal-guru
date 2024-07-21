import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const DitailJurnalGuru = () => {
  return (
    <div className="m-auto w-full h-screen ">
      <Navbar />
      <div className="p-4  flex justify-center w-full  md:justify-start  bg-white sticky top-20 ">
        <div className="w-[700px] mt-3  flex justify-start gap-5  ">
          <Link to={"/jadwal"}>
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
      </div>

      <div className="w-full   flex justify-center pt-20 ">
        <div className=" h-screen p-4  rounded-md  w-full ">
        
          <div className="px-3 py-4  mt-4   ">
            <div className="text-center font-bold text-xl bg-green-300 py-2">
              <p>Detail</p>
            </div>
          <div className="pl-4 py-2 bg-green-100">
            <p className="font-bold">Nama : </p>
            <p className="font-bold">Email :</p>
          </div>
            <table className="w-full text-md bg-gray-100 shadow-2xl   mb-4 text-center ">
              <thead className="sticky top-40 bg-green-300  ">
                <tr className="border-b  ">
                  <th className="text-center p-3 px-5 ">No</th>
                  <th className="text-center p-3 px-5 ">Tanggal</th>
                  <th className="text-center p-3 px-5">Hari</th>
                  <th className="text-center p-3 px-5">Kelas</th>
                  <th className="text-center p-3 px-5">Mata Pelajaran</th>
                  <th className="text-center p-3 px-5">Jam ke</th>
                  <th className="text-center p-3 px-5">Guru Pengganti</th>
                  <th className="text-center p-3 px-5">Materi</th>
                  <th className="text-center p-3 px-5">Jumlah Jam Pelajaran</th>

                  <th className="text-center p-3 px-5"></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-green-100 bg-gray-100 ">
                  <td className="p-3 px-5">1</td>
                  <td className="p-3 px-5">11/10/2013</td>
                  <td className="p-3 px-5">Kamis</td>
                  <td className="p-3 px-5">VII</td>
                  <td className="p-3 px-5">Agama Islam</td>
                  <td className="p-3 px-5">3</td>
                  <td className="p-3 px-5">Adam</td>
                  <td className="p-3 px-5">Sejarah Islam</td>
                  <td className="p-3 px-5">2</td>
                </tr>  
                    
              </tbody>
            </table>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default DitailJurnalGuru;
