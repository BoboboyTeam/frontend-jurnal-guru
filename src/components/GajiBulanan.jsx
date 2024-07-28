import { useDispatch, useSelector } from "react-redux";
import { fetchDataJP } from "../sandbox/jurnalRedux";
import { useEffect, useState } from "react";

const GajiBulanan = ({ id, from }) => {
  // Redux
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.jurnalGuru);
  const [monthName, setMonthName] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
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
    ];
   
    const month = from ? parseInt(from.split("-")[0]) : new Date().getMonth();
    const year = from ? from.split("-")[1] : new Date().getFullYear();
    setYear(year);
    dispatch(fetchDataJP({ id, month }));

    setMonthName(month ? monthlyName[month] : false);
  }, [dispatch, id, from]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }
  if (!data.jumlahJP || !data.gaji) {
    return <h1 className="font-bold">Journal is Empty</h1>;
  }
  return (
    <div>
      <h1 className="font-bold">
        Payment {monthName ? `in ${monthName} ${year}` : "This Month"}:
      </h1>
      <p>Total Teaching Hours: {data?.jumlahJP}</p>
      <p>Total Payment: {data?.gaji}</p>
    </div>
  );
};

export default GajiBulanan;
