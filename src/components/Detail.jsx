import React, { useEffect, useState } from "react";
import axios from "axios";

const Detail = ({id,detail,columns=null}) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");
  
  const [result, setResult] = useState([]);
  const [key, setKey] = useState([]);

  async function fetchDataId() {
    try {
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL + `/${role}/${detail}/` + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const keylog = Object.keys(data);
      console.log(data);
      setKey(columns ? columns : keylog);
      setResult(data);
      console.log(key);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchDataId();
    console.log(result);
  }, []);
  return (
    <div className="m-auto w-full h-screen ">

    

      <div className="w-full   flex justify-center pt-20 text-[#333333] ">
        <div className=" h-screen p-7  rounded-md  w-full ">
        
          <div className="px-3 py-4  mt-4   ">
            <div className="text-center font-bold text-xl bg-blue-300 py-2">
              <p>Detail</p>
            </div>
          <div className="pl-4 py-2 bg-blue-100 grid grid-cols-2">
            {key?.map((item, index) => {
              if(item === '_id') return null
              return (
                <div key={index} className=" flex gap-2 pl-4 py-2 bg-blue-100">
                  <p className="font-bold">{item.charAt(0).toUpperCase() + item.slice(1)} :</p>
                  <p>{item.includes('guru') ?  result[item]?.nama : result[item]}</p>
                </div>
              );
            })}

          </div>

          </div>          
        </div>
      </div>
    </div>
  );
};

export default Detail;