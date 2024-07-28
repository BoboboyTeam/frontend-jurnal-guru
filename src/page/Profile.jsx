import React, { useEffect, useState } from "react";
import axios from "axios";
import JurnalGuru from "./JurnalGuru";

const Profile = ({ id = null }) => {
  const token = localStorage.getItem("access_token");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [data, setData] = useState([]);
  const [Addons, setAddons] = useState(false);

  const fetchData = async () => {
    console.log(token);
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${role}/${
          id ? `users/${id}` : "profile"
        }`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(id ? response.data.role : role);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataJP = async () => {
    try {
      const token = localStorage.getItem("access_token");
     
      const link = `${process.env.BASE_URL}/${role}/filter/jurnal-guru/date${
        id ? `${"/"+id }` : ""
      }`;
      console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const thisMonth = new Date().getMonth();
      const jpData = data.dataJP[thisMonth];
      jpData.gaji = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        }).format(jpData.gaji);
      console.log(data.dataJP[thisMonth]);
      // setAddons(
      //   (
      //     <div className="w-[20rem]">
      //       <h1 className="font-bold text-xl underline">Gaji Bulan ini:</h1>
      //       <div className="pl-10">
      //       <p className="font-semibold text-[1.1rem]">Jumlah JP: {jpData?.jumlahJP}</p>
      //       <p className="font-semibold text-[1.1rem]">Total Gaji: {jpData?.gaji}</p>
      //       </div>
      //     </div>
      //   )
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getDataJP();
  }, []);

  return (
    <div className=" w-full h-screen ">
      <div class="flex flex-col pt-28">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5 ">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8  ">
            <div className="bg-green-400 flex justify-between gap-64 leading-8 p-5 rounded-md text-[#333333] ">
              <div className="p-14 text-3xl leading-[5rem] ">
                <p className="font-bold">
                  Nama : <span>{data.nama}</span>
                </p>
                <p className="font-bold">
                  Role : <span>{data.role}</span>
                </p>
                <p className="font-bold">
                  Email : <span>{data.email}</span>
                </p>

                
              </div>
              <div className="py-14">
                <img
                  className="w-[15rem] h-[15rem] rounded-full"
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                  alt=""
                />
              </div>
            </div>
            {role === "guru" && (
              <div class="overflow-scroll">
                
                <JurnalGuru isProfile={true} id={data?._id} addons={Addons} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
