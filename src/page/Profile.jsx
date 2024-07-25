import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {
  const token = localStorage.getItem("access_token");
  const [data, setData] = useState([])

  const fetchData = async () => {
    console.log(token)
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/guru/profile`,
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
            <div class="overflow-hidden">
              <table class="min-w-full ">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      First
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Last
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-gray-100 border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      1
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      2
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Jacob
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Dillan
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @fat
                    </td>
                  </tr>
                  <tr class="bg-gray-100 border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      3
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Twen
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @twitter
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      4
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Bob
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Dillan
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @fat
                    </td>
                  </tr>
                  <tr class="bg-gray-100 border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      5
                    </td>
                    <td
                      colspan="2"
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                    >
                      Larry the Bird
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @twitter
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
