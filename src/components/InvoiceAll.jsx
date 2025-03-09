import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
  Image,
} from "@react-pdf/renderer";
import pesri from "../assets/logo-pesri.png";
import JSZip from "jszip";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  companyDetails: {
    fontSize: 12,
    marginBottom: 10,
  },
  clientDetails: {
    fontSize: 12,
    marginBottom: 20,
  },
  invoiceDetails: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "10px 0",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  total: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
  },
});

// Helper function to format the date as "Month Year"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const year = date.getFullYear();
  return `${monthName} ${year}`;
};

// Create Document Component
const InvoiceDocument = ({ nama, alamat, tanggal, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={pesri} />

        {/* Data Sekolah */}
        <Text style={styles.companyDetails}>
          MTs Pesantren Ummusshabri (Pesri) Kendari{"\n"}
          Jl. Jend. Ahmad Yani No.3{"\n"}
          Kadia, Kec. Kendari, Kota Kendari{"\n"}
          Sulawesi Tenggara, Indonesia, 93117
        </Text>

        {/* Data Penerima Gaji */}
        <Text style={styles.clientDetails}>
          {nama ? nama : "Client Name"}
          {"\n"}
          Client Address Line 1{"\n"}
          Client Address Line 2{"\n"}
          City, State, ZIP
        </Text>
        <Text style={styles.invoiceDetails}>
          Invoice #: 123{"\n"}
          Date:{tanggal}{" "}
          
        </Text>
      </View>

      {/* Table Jurnal Guru */}
      <View style={styles.table}>
        {/* Penamaan Kolom */}
        <View style={styles.tableRow}>
          {data?.columnName?.map((item, index) => (
            <View key={index} style={styles.tableCol}>
              <Text style={styles.tableCell}>{item}</Text>
            </View>
          ))}
        </View>
        {/* Isi table */}
        {data?.data?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            {data?.keyColumns?.map((subItem, subIndex) => {
              if (subItem === "Payment") {
                return (
                  <View key={subIndex} style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item["jumlahJP"] * 8000)}
                    </Text>
                  </View>
                );
              }
              return (
                <View key={subIndex} style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item[subItem]}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      {/* Total Seluruhnya Berdasarkan Jumlah Jam Pelajaran */}
      <Text style={styles.total}>
        Total Lesson Hours: {data?.dataJP[Object.keys(data.dataJP)[0]]?.jumlahJP}
      </Text>
      <Text style={styles.total}>Total: {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(parseInt(data?.dataJP[Object.keys(data.dataJP)[0]]?.gaji))}</Text>
    </Page>
  </Document>
);


export default function Invoice({ invoices }) {
  const [loading, setLoading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);

  const handleDownloadAll = async () => {
    setLoading(true);
    setTotalInvoices(invoices.length);
    setCurrentProgress(0);

    try {
      for (const [index, invoice] of invoices.entries()) {
        const fileName = `invoice_${invoice.nama}_${invoice.tanggal}.pdf`;
        console.log(invoice);
        const doc = <InvoiceDocument   
        nama={invoice.nama}
        alamat={invoice.alamat}
        tanggal={invoice.tanggalString}
        data={invoice} />;
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setCurrentProgress(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error generating PDFs:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setTotalInvoices(0);
        setCurrentProgress(0);
      }, 2000);
    }
  };

  const progressPercentage = totalInvoices > 0 
    ? Math.round((currentProgress / totalInvoices) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Download All Section */}
      <div className="flex flex-col gap-2">
        <button 
          onClick={handleDownloadAll}
          disabled={loading || invoices.length === 0}
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? (
            `Generating (${currentProgress}/${totalInvoices})...`
          ) : (
            `Download All (${invoices.length})`
          )}
        </button>

        {totalInvoices > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}

        {totalInvoices > 0 && (
          <div className="text-sm text-gray-600 text-center">
            Generated {currentProgress} of {totalInvoices} invoices ({progressPercentage}%)
          </div>
        )}
      </div>


    </div>
  );
}