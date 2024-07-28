import React from 'react'
import FormJurnalForGuru from '../components/FormJurnalForGuru';
import FormJurnal from '../components/FormJurnal';
import { useParams } from 'react-router-dom';

const JurnalReform = () => {
    
  const {id} = useParams();
  if(localStorage.role === "guru"){
    return (
    <FormJurnalForGuru id={id}/>
  )
    }
    else if(localStorage.role === "admin"){
      return (
      <FormJurnal id={id}/>
    )
    }
}

export default JurnalReform