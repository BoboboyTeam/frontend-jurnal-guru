import React from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import Detail from "../components/Detail";


const DitailJurnalGuru = () => {
  
  const id = useParams().id;

  return(
    <Detail id={id} detail={"jurnal-guru"}/>
  )
};

export default DitailJurnalGuru;
