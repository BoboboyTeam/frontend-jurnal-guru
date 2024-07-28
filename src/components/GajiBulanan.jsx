import { useDispatch, useSelector } from "react-redux";
import { fetchDataJP } from "../sandbox/jurnalRedux";
import { useEffect, useState } from "react";

const GajiBulanan = ({id,month = new Date().getMonth(),year = new Date().getFullYear()}) => {
  // Redux
  const dispatch = useDispatch();
  
  const {data, loading, error} = useSelector((state) => state.jurnalGuru);
  const [monthName,setMonthName] = useState(new Date().getMonth());
  useEffect(() => {
    const monthlyName = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ]
    dispatch(fetchDataJP({id,month}));

    setMonthName(month ? monthlyName[month] : false);

  },[dispatch,id]);

    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error...</p>
    }

    return (
        <div>
            <h1 className="font-bold">Payment {monthName ? `in ${monthName} ${year}` : 'This Month'}:</h1>
            <p>Total Teaching Hours: {data?.jumlahJP}</p>
            <p>Total Payment: {data?.gaji}</p>
        </div>
    )
}

export default GajiBulanan;