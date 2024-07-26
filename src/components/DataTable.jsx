import React, { useEffect, useState } from 'react'
import Load from './Load'
import { set } from 'react-datepicker/dist/date_utils';

const DataTable = ({key,detail,query}) => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("access_token");

    const [keylog, setKeylog] = useState(key?key:[])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: "get",
                url: `${process.env.BASE_URL}/${role}/${detail}?${query}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const tempDict = response.length > 0 ? Object.keys(response.data[0]) : {}
            setKeylog(key?key:tempDict)
            setData(response.data);
            setLoading(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
      fetchData()
    },[])

    if(loading){
        return <Load/>
    }


  return (
    <div className="px-3 py-4 flex justify-center mt-16  ">
          <table className="w-full text-md bg-gray-100 shadow-2xl  mb-4 text-center overflow-x-scroll">
            <thead className={`${!isProfile && 'sticky top-40'} bg-green-500`}>
              <tr className="border-b  ">
                <th className="text-center p-3 px-5 ">No</th>
                <th className="text-center p-3 px-5">Tanggal</th>
                <th className="text-center p-3 px-5">Guru</th>
                <th className="text-center p-3 px-5">Kelas</th>
                <th className="text-center p-3 px-5">Guru Pengganti</th>
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
                     
                        <tr key={index} className="border-b hover:bg-green-100 bg-gray-100 ">
                          <td className="p-3 px-5">{++index}</td>
                          {keylog.map((key,index)=>{
                            if(key.includes("guru")){
                              return(
                                <td key={index} className="p-3 px-5">{item[key].nama}</td>
                              )
                            }
                            return(
                              <td key={index} className="p-3 px-5">{item[key]}</td>
                            )
                          })}
                          <td className="p-3 px-5">5</td>
                          <td className="p-3 px-5 flex justify-center">
                            <Link to={"/ditailJurnalGuru/"+item._id}>
                              <button className="btn mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white">
                                <Icon icon={externalLink} /> Ditail
                              </button>
                            </Link>

                           <Link to={"/editJurnalGuru/"+item._id}> <button className="btn text-white bg-green-500 hover:bg-green-700 mr-2">
                              <Icon icon={pencilSquareO} /> Edit
                            </button></Link>

                            <button
                              className="btn bg-red-500 hover:bg-red-700 text-white"
                              onClick={() => handdleDeletePopUp()}
                            >
                              <Icon icon={bin} />
                              Hapus
                            </button>

                            <dialog id="my_modal_1" className="modal text-[#EEEEEE]">
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
  )
}

export default DataTable