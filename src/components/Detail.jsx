import React, { useEffect, useState } from "react";
import axios from "axios";

const Detail = ({id,detail,keyColumns=null,columnsName=null}) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");
  
  const [result, setResult] = useState([]);
  const [key, setKey] = useState([]);
  const [columns, setColumns] = useState(columnsName ? columnsName : []);

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
      setColumns(columnsName ? columnsName : keylog);
      console.log(keyColumns);
      setKey(keyColumns ?keyColumns : keylog);
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
      <div className="w-full   flex justify-center  text-[#333333] ">
        <div className=" h-screen   rounded-md  w-full"  style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}>

        
          <div className="px-3 py-4  mt-4 sticky top-20   ">
            <div className="text-center font-bold text-xl bg-blue-300 py-2">
              <p>Detail</p>
            </div>
          <div className="pl-4 py-2 bg-blue-100 grid grid-cols-2">
            {key?.map((item, index) => {
              if(item === '_id') return null
              return (
                <div key={index} className=" flex gap-2 pl-4 py-2 bg-blue-100">
                  <p className="font-bold">{columns[index].charAt(0).toUpperCase() + columns[index].slice(1)} :</p>
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
