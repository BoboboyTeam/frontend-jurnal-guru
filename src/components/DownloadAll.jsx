/*
Get All Teachers
Get All Journal based on Teacher
Add popup to set date
Add those to invoice state variable with this structure:
[
  {
    "tanggal": "2023-09-01",
    "nama": "John Doe",
    "alamat": "123 Main Street",
    "data": {
      "columnName": ["Date",
                      "Start Hours",
                      "Lesson Material",
                      "Working Hours",
                      "Payment",],
      "keyColumns": ["updateAt",
                      "jamKe",
                      "materi",
                      "jumlahJP",
                      "Payment",],
      "data": [
        {
          "subject": "Mathematics",
          "teacher": "Ms. Smith",
          "jumlahJP": 5
        },
        {
          "subject": "History",
          "teacher": "Mr. Johnson",
          "jumlahJP": 3
        }
      ],
      "dataJP": {
        "jumlahJP": 8,
        "gaji": "64000"
      }
    }
  },
]
*/

import React from 'react'
import Invoice from './InvoiceAll'
import axios from 'axios'

const DownloadAll = () => {
 const [invoices, setInvoices] = React.useState([])
 
 React.useEffect(() => {
    const fetchData = async () => {
        try 
        {   const token = localStorage.getItem("access_token");
            let { data } = await axios({
                method: "get",
                url: `${process.env.BASE_URL}/public/invoices`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setInvoices(data);
            console.log("DATA<",data);
            }
        catch (error) {
            console.log(
                "error",
                error
            )
            console.error(error)
        }
    }
    fetchData()
 }, [])
 if (invoices.length === 0) return <h1>Loading...</h1>;
 return (
    <div className="p-1 py-5">
        <Invoice invoices={invoices} />
    </div>
  )
}

export default DownloadAll