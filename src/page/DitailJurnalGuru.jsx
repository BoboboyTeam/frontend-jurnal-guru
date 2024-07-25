import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const DitailJurnalGuru = () => {
  const id = useParams().id;

  return(
    <Detail id={id}/>
  )
};

export default DitailJurnalGuru;
