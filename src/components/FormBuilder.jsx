import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Load from "./Load";
import GuruSelector from "./GuruSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../sandbox/storedRedux";

const FormBuilder = ({
  id = null,
  detail,
  keyColumns = null,
  columnsName = null,
}) => {
  const role = localStorage.getItem("role");
  const [key, setKey] = useState(keyColumns ? keyColumns : []);
  const [columns, setColumns] = useState(columnsName ? columnsName : []);
  const [editData, setEditData] = useState({});
  
  // Redux Fetch Data
  const storedData = useSelector((state) => state.stored);

  // Redux Get State
  const guru = useSelector((state) => state.guru?.data);
  const kelas = useSelector((state) => state.kelas?.data);
  const mapel = useSelector((state) => state.mapel?.data);
  const stored = useSelector((state) => state.stored?.data);
  const dispatch = useDispatch();

  const postForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    let data = {};
    for (let key of form.keys()) {
      data[key] = form.get(key);
    }
    console.log(data);

    try {
      const linkId = `${id && id!== "add" ? `/${id}` : ""}`;
      const link = `${process.env.BASE_URL}/${role}/${detail}${linkId}`;
      const response = await axios({
        method: linkId ? "put" : "post",
        url: link,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: linkId ? "Succesfully updated data" : "Successfully added data",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    let request = {};
    if (detail) {
      request["detail"] = detail;
    }
    if (id && id!=="add") {
      request["id"] = id;
    }
    if (request != {}) {
      console.log(request,"<<<<<<<<<<<<<<<,");
      dispatch(fetchData({request}));
    }
    console.log(storedData);
  }, [dispatch, detail, id]);

  // if (loading) return <Load />;
  if(storedData?.loading) return <Load/>
  if (storedData?.error) return <h1>Error</h1>;
  

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        className="items-center justify-center md:h-screen  p-12"
      >
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form onSubmit={postForm}>
            <div className="mb-4">
              <h1 className="text-2xl text-white font-bold">Form Builder</h1>
            </div>
            <div className="mb-4 md:grid md:grid-cols-2 gap-[2rem]">
              {key?.map((item,index) => (
                <div key={index}>
                  <h4 className={`key${index} py-1`}>{columns[index]}</h4>
                  <input
                    type="text"
                    name={item}
                    placeholder={item}
                    className="bg-gray-200 rounded-md p-2"
                  />
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="text-white rounded-md border-none hover:bg-green-600 bg-green-500 px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
