import React from 'react'
import DataTable from '../components/DataTable'

const Guru = () => {
  return (
    <DataTable keyColumns={["nama","role","email"]} columnsName={["Name","Role","Email"]} detail={"users"} parentLink={"guru"} />
  )
}

export default Guru