import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import JurnalGuru from "./JurnalGuru";

const Profile = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const [data, setData] = useState([])

  const fetchData = async () => {
    console.log(token)
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${role}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  

  return (
    <div className=" w-full h-screen ">
      
      <div class="flex flex-col pt-28">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5 ">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8  ">
            <div className="bg-green-400 flex justify-between gap-64 leading-8 p-5 rounded-md text-[#333333] ">
              <div className="p-14 text-3xl leading-[5rem] ">
                <p className="font-bold">Nama : <span>{data.nama}</span></p>
                <p className="font-bold">Role : <span>{data.role}</span></p>
                <p className="font-bold">Email : <span>{data.email}</span></p>
              </div>
              <div className="py-14">
                <img className="w-[15rem] h-[15rem] rounded-full" src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="" />
              </div>
            </div>
            {role==="guru" &&<div class="overflow-scroll">
              
              <JurnalGuru isProfile={true}/>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
