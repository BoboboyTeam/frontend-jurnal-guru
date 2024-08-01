import React from 'react'
import DataTable from '../components/DataTable'

const Guru = () => {
  return (
    <div>
      <DataTable keyColumns={["nama","role","email"]} columnsName={["Name","Role","Email"]} detail={"users"} parentLink={"teacher"} title={'List Of Teachers'} />

    </div>
  )
}

export default Guru