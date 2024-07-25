import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Detail from "../components/Detail";

const DitailJadwalPelajaran = () => {
  const id = useParams().id;

  return(
    <Detail id={id}/>
  )
};

export default DitailJadwalPelajaran;
