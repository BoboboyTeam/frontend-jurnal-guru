import React from 'react'
import FormBuilder from '../components/FormBuilder'

const TestPage = () => {
  return (
    <FormBuilder detail={"kelas"} keyColumns={["nama"]} columnsName={["Class Name"]} />
  )
}

export default TestPage