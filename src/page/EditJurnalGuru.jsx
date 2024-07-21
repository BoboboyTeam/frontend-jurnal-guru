import React from "react";
import { Link } from "react-router-dom";


const EditJurnalGuru = () => {
    const guru =["Budi1","Budi2"]
    const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
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
  return (
    <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        className="items-center justify-center md:h-screen  p-12"
      >
      
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
            <div className="text-xl font-bold py-5 mb-4 text-center text-white">
                Edit
            </div>
          <form >
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
                    {day.map((item,index) => {
                      return (
                        <>
                          <option key={index} value="hari">{item}</option>
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
                      {jam.map((item,index) => {
                        return (
                          <>
                            <option key={index} value={item}>{item}</option>
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
                        <option key={item._id} value={item._id}>{item.nama}</option>
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
                  <select className="w-full" id="guruPengganti" name="guruPengganti">
                  <option value="">None</option>
                    {guru?.map((item) => {
                      return (
                        <>
                          <option key={item._id} value={item._id}>{item.nama}</option>
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
                    {kelas.map((item,index) => {
                      return (
                        <>
                          <option key={index} value={item}>{item}</option>
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
                      {mataPelajaran.map((item,index) => {
                        return (
                          <>
                            <option key={index} value={item}>{item}</option>
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
                    name="jp"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="text-white rounded-md border-none hover:bg-green-600 bg-green-500  px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" >
                Submit
              </button>
              <Link to={"/jadwal"}><button  className="text-white rounded-md border-none hover:bg-green-600 bg-green-500  px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" >
                Kembali
              </button></Link>
            </div>
          </form>
        </div>
      </div>
  )
}

export default EditJurnalGuru
