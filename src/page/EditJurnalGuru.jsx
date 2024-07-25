import React from "react";
import { Link, useParams } from "react-router-dom";
import FormJurnal from "../components/FormJurnal";


const EditJurnalGuru = () => {
    const guru =["Budi1","Budi2"]
    const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const kelas = ["VII", "VIII", "IX"];
    const jam = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const mataPelajaran = [
      "Matematika",
      "Bahasa Inggris",
      "Bahasa Jawa",
      "IPA",
      "IPS",
      "Biologi",
    ];
    const id = useParams().id
  return (
    <FormJurnal id={id}/>
  )
}

export default EditJurnalGuru
