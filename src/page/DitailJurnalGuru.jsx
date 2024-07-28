import React from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import Detail from "../components/Detail";


const DitailJurnalGuru = () => {
  
  const {id} = useParams();
  const keyColumns = ['hari','mapel','kelas','jamKe','guru','guruPengganti','materi','jumlahJP'];
  const columnsName = ['Day','Lesson','Class','Start Hours','Teacher','Teacher Replacement','Material','Total Hours'];

  return(
    <Detail id={id} detail={"jurnal-guru"} keyColumns={keyColumns} columnsName={columnsName}/>
  )
};

export default DitailJurnalGuru;
