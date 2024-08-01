import React, { useEffect, useState } from "react";
import axios from "axios";
import JurnalGuru from "./JurnalGuru";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataProfile } from "../redux/profileRedux";
import { selectDataProfile, selectRoleProfile } from "../redux/selectorRedux";
const Profile = ({ id = null }) => {
  const token = localStorage.getItem("access_token");
  const role = useSelector(selectRoleProfile);
  
  const data = useSelector(selectDataProfile);


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataProfile({id:id}));
    console.log(role)
  }, [dispatch]);

  if (data?.loading) return <h1>Loading...</h1>;
  if (
    !data ||
    data?.error?.message?.split(" ")[4] === "404"
  ) {
    return (
      <div className="px-10 py-2">
        <h1 className="font-bold">Profile is Empty</h1>
      </div>
    );
  }
  if (data?.error) return <h1>Error</h1>;

  return (
    <div className=" w-full h-screen ">
      <div class="flex flex-col pt-28">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5 ">
          <div class="py-2 inline-block w-[100%] sm:px-6 lg:px-8  ">
            <div className="bg-green-400 flex justify-between gap-64 leading-8 p-5 rounded-md text-[#333333] ">
              <div className="p-14 text-3xl leading-[5rem] ">
                <p className="font-bold">
                  Nama : <span>{data?.data?.nama}</span>
                </p>
                <p className="font-bold">
                  Role : <span>{role}</span>
                </p>
                <p className="font-bold">
                  Email : <span>{data?.data?.email}</span>
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
            {role === "teacher" && (
              <div class="overflow-scroll no-scrollbar">
                
                <JurnalGuru isProfile={true} id={data?.data?._id}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
