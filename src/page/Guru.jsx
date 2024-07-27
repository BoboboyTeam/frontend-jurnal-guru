import React from 'react'
import DataTable from '../components/DataTable'

const Guru = () => {
  return (
    <DataTable columns={["nama","role","email"]} detail={"users"} parentLink={"guru"} />
  )
}

export default Guru