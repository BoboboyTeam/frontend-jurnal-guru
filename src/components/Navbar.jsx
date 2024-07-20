import React from "react";
import Logo from "../assets/logo.png"
const Navbar = () => {
  return (
    <div className="w-full  bg-white  h-24 fixed flex pl-6 gap-2 border-b-2 border-slate-400 justify-center md:justify-start z-50  ">
      <div>
        <img
          src="https://ummusshabri.sch.id/template/awal/assets/img/logo-pesri.png"
          width={80}
          alt=""
          srcSet=""
        />
      </div>
      <div className="mt-1">
        <img
          src={Logo}
          width={70}
          alt=""
          srcSet=""
        />
      </div>
    </div>
  );
};

export default Navbar;
