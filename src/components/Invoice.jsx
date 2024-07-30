import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import pesri from "../assets/logo-pesri.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
    width: "25%",
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

// Create Document Component
const InvoiceDocument = ({nama, alamat, tanggal, data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={pesri} />

        <Text style={styles.companyDetails}>
          MTs Pesantren Ummusshabri (Pesri) Kendari{"\n"}
          Jl. Jend. Ahmad Yani No.3{"\n"}
          Kadia, Kec. Kendari, Kota Kendari{"\n"}
          Sulawesi Tenggara, Indonesia, 93117
        </Text>
        <Text style={styles.clientDetails}>
          {nama ? nama : "Client Name"}{"\n"}
          Client Address Line 1{"\n"}
          Client Address Line 2{"\n"}
          City, State, ZIP
        </Text>
        <Text style={styles.invoiceDetails}>
          Invoice #: 123{"\n"}
          Date: 2024-07-30
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Unit Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$10.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$20.00</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$15.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$15.00</Text>
          </View>
        </View>
      </View>
      <Text style={styles.total}>Total: $35.00</Text>
    </Page>
  </Document>
);

export default function Invoice({nama, alamat, tanggal, data}) {
  return (
    <div className="bg-blue-400 text-blue-900 p-3 border rounded-xl w-[11rem] hover:bg-blue-900 hover:text-blue-400 hover:cursor-pointer hover:scale-110 hover:duration-100 text-center">
    <PDFDownloadLink document={<InvoiceDocument nama={nama} alamat={alamat} tanggal={tanggal} data={data} />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Print Invoice"
      }
    </PDFDownloadLink>
    </div>
  );
}
